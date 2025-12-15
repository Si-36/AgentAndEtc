"""
Context Compiler - Google ADK Pattern Implementation
4-Layer Context Architecture: Working Context, Session, Memory, Artifacts

Research basis: Google ADK "Context as Compiler" paradigm
- 3x faster than naive RAG
- 5x cheaper
- Separate storage from presentation
"""

from typing import Dict, List, Optional, Any
import json
from datetime import datetime
from uuid import UUID
import psycopg2
from psycopg2.extras import RealDictCursor
import openai

from src.config import settings


class ContextCompiler:
    """
    Compiles working context from 4 layers:
    1. Working Context (ephemeral, 10-20K tokens, thrown away)
    2. Session Context (permanent append-only log)
    3. Memory (Core + Archival semantic search)
    4. Artifacts (lazy-loaded large files)
    """

    def __init__(self, db_connection):
        self.db = db_connection
        self.openai_client = openai.OpenAI(api_key=settings.openai_api_key)

    async def compile_working_context(
        self,
        user_id: UUID,
        session_id: UUID,
        current_message: str,
        include_artifacts: bool = False
    ) -> Dict[str, Any]:
        """
        Compile working context for LLM call

        Returns:
        {
            "core_memory": {...},
            "recent_events": [...],
            "relevant_memories": [...],
            "artifacts": [...],  # if requested
            "persian_context": {...},
            "token_count": 15000
        }
        """

        context = {}

        # Layer 1: Core Memory (always included, 2KB)
        context["core_memory"] = await self._get_core_memory(user_id)

        # Layer 2: Recent Session Events (last N messages)
        context["recent_events"] = await self._get_recent_session_events(
            session_id,
            limit=settings.session_history_limit
        )

        # Layer 3: Archival Memory (semantic search on current message)
        context["relevant_memories"] = await self._search_archival_memory(
            user_id,
            query=current_message,
            limit=5
        )

        # Layer 4: Artifacts (only if explicitly requested)
        if include_artifacts:
            context["artifacts"] = await self._get_recent_artifacts(user_id, limit=3)
        else:
            context["artifacts"] = []

        # Persian cultural context
        context["persian_context"] = self._get_persian_context()

        # User preferences
        context["user_preferences"] = await self._get_user_preferences(user_id)

        # Estimate token count
        context["token_count"] = self._estimate_tokens(context)

        return context

    async def _get_core_memory(self, user_id: UUID) -> Dict:
        """
        Fetch Core Memory (2KB editable profile)
        Always included in working context
        """
        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT core_memory FROM letta_core_memory WHERE user_id = %s",
                (str(user_id),)
            )
            result = cursor.fetchone()

            if result:
                return result['core_memory']
            else:
                # Initialize default Core Memory
                default_memory = {
                    "persona": {
                        "name": "",
                        "company": "",
                        "role": "",
                        "preferences": {
                            "formality": "formal",
                            "calendar": "jalali",
                            "language": "persian"
                        }
                    },
                    "context": {
                        "current_projects": [],
                        "key_goals": [],
                        "recent_decisions": []
                    }
                }

                # Insert default
                cursor.execute(
                    """
                    INSERT INTO letta_core_memory (user_id, core_memory)
                    VALUES (%s, %s)
                    ON CONFLICT (user_id) DO NOTHING
                    """,
                    (str(user_id), json.dumps(default_memory))
                )
                self.db.commit()

                return default_memory

    async def _get_recent_session_events(
        self,
        session_id: UUID,
        limit: int = 20
    ) -> List[Dict]:
        """
        Fetch last N events from Session Context
        Agent-directed retrieval
        """
        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                """
                SELECT event_type, timestamp, payload
                FROM session_events
                WHERE session_id = %s
                ORDER BY timestamp DESC
                LIMIT %s
                """,
                (str(session_id), limit)
            )
            events = cursor.fetchall()

            # Reverse to chronological order
            return list(reversed([dict(e) for e in events]))

    async def _search_archival_memory(
        self,
        user_id: UUID,
        query: str,
        limit: int = 5
    ) -> List[Dict]:
        """
        Semantic search in Archival Memory
        Only retrieve when relevant to current message
        """

        # Generate embedding for query
        embedding_response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=query
        )
        query_embedding = embedding_response.data[0].embedding

        # Search with pgvector
        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            # Convert embedding to PostgreSQL array format
            embedding_str = '[' + ','.join(map(str, query_embedding)) + ']'

            cursor.execute(
                """
                SELECT
                    content,
                    metadata,
                    1 - (embedding <=> %s::vector) AS similarity
                FROM letta_archival_memory
                WHERE user_id = %s
                ORDER BY embedding <=> %s::vector
                LIMIT %s
                """,
                (embedding_str, str(user_id), embedding_str, limit)
            )

            results = cursor.fetchall()

            return [
                {
                    "content": r['content'],
                    "similarity": float(r['similarity']),
                    "metadata": r['metadata']
                }
                for r in results
                if r['similarity'] > 0.7  # Similarity threshold
            ]

    async def _get_recent_artifacts(
        self,
        user_id: UUID,
        limit: int = 3
    ) -> List[Dict]:
        """
        Get recently accessed artifacts
        Only loaded on-demand (lazy loading)
        """
        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                """
                SELECT id, artifact_type, file_name, s3_key, metadata
                FROM artifacts
                WHERE user_id = %s
                ORDER BY COALESCE(last_accessed_at, created_at) DESC
                LIMIT %s
                """,
                (str(user_id), limit)
            )

            artifacts = cursor.fetchall()

            return [
                {
                    "id": str(a['id']),
                    "type": a['artifact_type'],
                    "file_name": a['file_name'],
                    "s3_key": a['s3_key'],
                    "metadata": a['metadata']
                }
                for a in artifacts
            ]

    def _get_persian_context(self) -> Dict:
        """
        Inject Persian cultural context
        - Jalali calendar
        - Upcoming holidays
        - Business context
        """
        from persiantools.jdatetime import JalaliDate
        import datetime

        today_gregorian = datetime.date.today()
        today_jalali = JalaliDate(today_gregorian)

        # Calculate upcoming holidays
        holidays = self._get_upcoming_holidays(today_jalali)

        return {
            "current_date_jalali": str(today_jalali),
            "current_date_gregorian": str(today_gregorian),
            "weekday_persian": today_jalali.strftime("%A"),
            "upcoming_holidays": holidays,
            "fiscal_year": f"FY{today_jalali.year}",
            "quarter": f"Q{(today_jalali.month - 1) // 3 + 1}"
        }

    def _get_upcoming_holidays(
        self,
        current_date,
        lookahead_days: int = 90
    ) -> List[Dict]:
        """
        Persian holidays relevant to business
        """
        from persiantools.jdatetime import JalaliDate

        holidays = [
            {"name": "Nowruz", "month": 1, "day": 1, "description": "Persian New Year"},
            {"name": "Sizdah Bedar", "month": 1, "day": 13, "description": "Nature Day"},
            {"name": "Oil Nationalization Day", "month": 12, "day": 29, "description": "National holiday"},
            {"name": "Islamic Republic Day", "month": 1, "day": 12, "description": "National holiday"},
            {"name": "Yalda Night", "month": 9, "day": 30, "description": "Winter solstice celebration"},
        ]

        upcoming = []
        for holiday in holidays:
            try:
                holiday_date = JalaliDate(current_date.year, holiday["month"], holiday["day"])
                if holiday_date < current_date:
                    holiday_date = JalaliDate(current_date.year + 1, holiday["month"], holiday["day"])

                # Calculate days away
                days_away = (holiday_date.todate() - current_date.todate()).days

                if days_away <= lookahead_days:
                    upcoming.append({
                        "name": holiday["name"],
                        "date": str(holiday_date),
                        "days_away": days_away,
                        "description": holiday["description"]
                    })
            except:
                continue

        return sorted(upcoming, key=lambda x: x["days_away"])

    async def _get_user_preferences(self, user_id: UUID) -> Dict:
        """Get user preferences from users table"""
        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT preferences FROM users WHERE id = %s",
                (str(user_id),)
            )
            result = cursor.fetchone()

            if result:
                return result['preferences']
            else:
                return {
                    "language": "persian",
                    "calendar": "jalali",
                    "formality": "formal"
                }

    def _estimate_tokens(self, context: Dict) -> int:
        """
        Rough token estimation (1 token ≈ 4 characters for English, 2-3 for Persian)
        """
        context_str = json.dumps(context, ensure_ascii=False)
        # Conservative estimate: 3 chars per token
        return len(context_str) // 3

    async def format_for_llm(
        self,
        context: Dict,
        current_message: str,
        system_prompt: Optional[str] = None
    ) -> str:
        """
        Format compiled context into LLM prompt

        Google ADK pattern: Presentation layer separate from storage
        """

        # Extract components
        core_memory = context.get("core_memory", {})
        recent_events = context.get("recent_events", [])
        relevant_memories = context.get("relevant_memories", [])
        persian_context = context.get("persian_context", {})
        user_prefs = context.get("user_preferences", {})

        # Build prompt sections
        sections = []

        # System instructions
        if system_prompt:
            sections.append(system_prompt)

        # Persian context
        sections.append(f"""
PERSIAN CONTEXT:
- Today (Jalali): {persian_context.get('current_date_jalali')}
- Today (Gregorian): {persian_context.get('current_date_gregorian')}
- Fiscal Year: {persian_context.get('fiscal_year')}
- Quarter: {persian_context.get('quarter')}
- Upcoming Holidays: {', '.join([h['name'] + f" ({h['days_away']} days)" for h in persian_context.get('upcoming_holidays', [])])}
""")

        # User profile (Core Memory)
        persona = core_memory.get("persona", {})
        context_data = core_memory.get("context", {})

        sections.append(f"""
USER PROFILE:
- Name: {persona.get('name', 'Unknown')}
- Company: {persona.get('company', 'Unknown')}
- Role: {persona.get('role', 'Unknown')}
- Language Preference: {user_prefs.get('language', 'persian')}
- Formality: {user_prefs.get('formality', 'formal')}

CURRENT CONTEXT:
- Projects: {', '.join(context_data.get('current_projects', []))}
- Goals: {', '.join(context_data.get('key_goals', []))}
""")

        # Recent conversation
        if recent_events:
            sections.append("\nRECENT CONVERSATION:")
            for event in recent_events[-10:]:  # Last 10 events
                event_type = event.get('event_type', '')
                payload = event.get('payload', {})

                if event_type == 'UserMessage':
                    sections.append(f"User: {payload.get('content', '')}")
                elif event_type == 'AssistantMessage':
                    sections.append(f"Assistant: {payload.get('content', '')}")

        # Relevant long-term memories
        if relevant_memories:
            sections.append("\nRELEVANT PAST KNOWLEDGE:")
            for memory in relevant_memories[:3]:  # Top 3
                sections.append(f"- {memory['content']} (similarity: {memory['similarity']:.2f})")

        # Current user message
        sections.append(f"\nCURRENT USER REQUEST:\n{current_message}")

        return "\n".join(sections)

    async def store_event(
        self,
        session_id: UUID,
        user_id: UUID,
        event_type: str,
        payload: Dict,
        metadata: Optional[Dict] = None
    ):
        """
        Store event to Session Context (append-only)
        """
        with self.db.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO session_events (session_id, user_id, event_type, payload, metadata)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    str(session_id),
                    str(user_id),
                    event_type,
                    json.dumps(payload),
                    json.dumps(metadata or {})
                )
            )
            self.db.commit()

    async def edit_core_memory(
        self,
        user_id: UUID,
        field_path: str,
        value: Any
    ):
        """
        Agent tool to edit Core Memory

        Example: edit_core_memory("context.key_goals", ["New goal 1", "New goal 2"])
        """

        # Load current Core Memory
        core_memory = await self._get_core_memory(user_id)

        # Parse field path
        parts = field_path.split('.')

        # Navigate to field
        obj = core_memory
        for part in parts[:-1]:
            if part not in obj:
                obj[part] = {}
            obj = obj[part]

        # Set value
        obj[parts[-1]] = value

        # Enforce 2KB limit
        memory_json = json.dumps(core_memory)
        if len(memory_json) > settings.core_memory_max_bytes:
            # Truncate recent_decisions if needed
            if 'context' in core_memory and 'recent_decisions' in core_memory['context']:
                while len(json.dumps(core_memory)) > settings.core_memory_max_bytes:
                    if core_memory['context']['recent_decisions']:
                        core_memory['context']['recent_decisions'].pop(0)
                    else:
                        break

        # Save to database
        with self.db.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO letta_core_memory (user_id, core_memory, last_edited_at, edit_count)
                VALUES (%s, %s, NOW(), 1)
                ON CONFLICT (user_id) DO UPDATE SET
                    core_memory = EXCLUDED.core_memory,
                    last_edited_at = NOW(),
                    edit_count = letta_core_memory.edit_count + 1
                """,
                (str(user_id), json.dumps(core_memory))
            )
            self.db.commit()

        return f"Core Memory updated: {field_path} = {value}"

    async def store_in_archival(
        self,
        user_id: UUID,
        content: str,
        metadata: Optional[Dict] = None,
        source_type: Optional[str] = None,
        source_id: Optional[UUID] = None
    ):
        """
        Store content in Archival Memory with semantic embedding
        """

        # Generate embedding
        embedding_response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=content
        )
        embedding = embedding_response.data[0].embedding

        # Store
        with self.db.cursor() as cursor:
            embedding_str = '[' + ','.join(map(str, embedding)) + ']'

            cursor.execute(
                """
                INSERT INTO letta_archival_memory
                    (user_id, content, embedding, metadata, source_type, source_id)
                VALUES (%s, %s, %s::vector, %s, %s, %s)
                """,
                (
                    str(user_id),
                    content,
                    embedding_str,
                    json.dumps(metadata or {}),
                    source_type,
                    str(source_id) if source_id else None
                )
            )
            self.db.commit()
