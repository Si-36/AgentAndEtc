"""
LLM Client Integrations
- Gemini 2.0 Flash (80% of requests, FREE tier)
- Claude Sonnet 4.5 (5% of requests)
- Claude Opus 4.5 (15% of requests)
"""

from typing import Dict, List, Optional, Any
import json
from datetime import datetime
import google.generativeai as genai
from anthropic import Anthropic
import asyncio

from src.config import settings, LLM_MODELS


class GeminiClient:
    """
    Gemini 2.0 Flash client
    - FREE tier: 1,500 requests/day
    - Multimodal support
    - 1M token context window
    - JSON mode
    """

    def __init__(self):
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')

    async def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 2048,
        json_mode: bool = False,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate response from Gemini

        Returns:
        {
            "content": "...",
            "model": "gemini-2.0-flash-exp",
            "usage": {"input_tokens": 1000, "output_tokens": 500},
            "cost": 0.000015
        }
        """

        # Build generation config
        generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_tokens,
        }

        if json_mode:
            generation_config["response_mime_type"] = "application/json"

        # Combine system prompt with user prompt
        full_prompt = prompt
        if system_prompt:
            full_prompt = f"{system_prompt}\n\n{prompt}"

        # Generate
        try:
            response = self.model.generate_content(
                full_prompt,
                generation_config=generation_config
            )

            # Extract usage
            usage = {
                "input_tokens": response.usage_metadata.prompt_token_count,
                "output_tokens": response.usage_metadata.candidates_token_count,
            }

            # Calculate cost (FREE tier, then $0.01/1M)
            model_config = LLM_MODELS["gemini-2.0-flash"]
            cost = (
                (usage["input_tokens"] / 1_000_000) * model_config["cost_per_1m_input"] +
                (usage["output_tokens"] / 1_000_000) * model_config["cost_per_1m_output"]
            )

            return {
                "content": response.text,
                "model": "gemini-2.0-flash-exp",
                "usage": usage,
                "cost": cost,
                "finish_reason": "stop"
            }

        except Exception as e:
            return {
                "content": None,
                "model": "gemini-2.0-flash-exp",
                "error": str(e),
                "usage": {"input_tokens": 0, "output_tokens": 0},
                "cost": 0
            }

    async def classify_complexity(self, user_message: str) -> Dict:
        """
        Use Gemini to classify request complexity

        Returns:
        {
            "complexity_score": 0-10,
            "category": "simple" | "medium" | "complex" | "critical",
            "reasoning": "..."
        }
        """

        prompt = f"""
Rate the complexity of this user request on a scale of 0-10:

User Request: "{user_message}"

Consider:
1. Novelty: Is this a new type of request or routine?
2. Ambiguity: How clear are the requirements?
3. Stakes: What's the impact of getting this wrong?
4. Analysis Depth: How much reasoning is required?

Scoring guide:
- 0-3: Simple (FAQ, lookup, routine task)
- 4-6: Medium (analysis, draft, standard decision)
- 7-8: Complex (synthesis, multi-factor decision)
- 9-10: Critical (high-stakes, strategic, legal, financial)

Output JSON:
{{
    "complexity_score": <0-10>,
    "category": "simple|medium|complex|critical",
    "reasoning": "<brief explanation>"
}}
"""

        response = await self.generate(
            prompt=prompt,
            temperature=0.3,
            json_mode=True
        )

        if response.get("error"):
            # Default to medium complexity if classification fails
            return {
                "complexity_score": 5,
                "category": "medium",
                "reasoning": "Classification failed, defaulting to medium"
            }

        try:
            result = json.loads(response["content"])
            return result
        except:
            return {
                "complexity_score": 5,
                "category": "medium",
                "reasoning": "Failed to parse classification"
            }


class ClaudeClient:
    """
    Claude Sonnet 4.5 / Opus 4.5 client
    - Sonnet: Better reasoning, $3/$15 per MTok
    - Opus: Deepest reasoning, $15/$75 per MTok
    - Prompt caching support
    """

    def __init__(self):
        self.client = Anthropic(api_key=settings.anthropic_api_key)

    async def generate(
        self,
        prompt: str,
        model: str = "claude-sonnet-4-5",  # or "claude-opus-4-5"
        temperature: float = 0.7,
        max_tokens: int = 4096,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate response from Claude

        Returns:
        {
            "content": "...",
            "model": "claude-sonnet-4-5-20250929",
            "usage": {"input_tokens": 2000, "output_tokens": 1000},
            "cost": 0.021
        }
        """

        # Map model name to ID
        model_mapping = {
            "claude-sonnet-4-5": "claude-sonnet-4-5-20250929",
            "claude-opus-4-5": "claude-opus-4-5-20251101"
        }
        model_id = model_mapping.get(model, model)

        # Build messages
        messages = [{"role": "user", "content": prompt}]

        try:
            response = self.client.messages.create(
                model=model_id,
                max_tokens=max_tokens,
                temperature=temperature,
                system=system_prompt if system_prompt else "",
                messages=messages
            )

            # Extract usage
            usage = {
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens,
            }

            # Calculate cost
            model_config = LLM_MODELS[model]
            cost = (
                (usage["input_tokens"] / 1_000_000) * model_config["cost_per_1m_input"] +
                (usage["output_tokens"] / 1_000_000) * model_config["cost_per_1m_output"]
            )

            return {
                "content": response.content[0].text,
                "model": model_id,
                "usage": usage,
                "cost": cost,
                "finish_reason": response.stop_reason
            }

        except Exception as e:
            return {
                "content": None,
                "model": model_id,
                "error": str(e),
                "usage": {"input_tokens": 0, "output_tokens": 0},
                "cost": 0
            }


class LLMRouter:
    """
    Routes requests to appropriate LLM based on complexity

    Distribution target:
    - Gemini Flash: 80%
    - Claude Sonnet: 5%
    - Claude Opus: 15%

    Research: Multi-model routing reduces cost while maintaining quality
    """

    def __init__(self, db_connection):
        self.db = db_connection
        self.gemini = GeminiClient()
        self.claude = ClaudeClient()

    async def route_and_generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        force_model: Optional[str] = None,
        task_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Route request to appropriate model and generate response

        Args:
            prompt: User request
            system_prompt: System instructions
            user_id: For cost tracking
            session_id: For cost tracking
            force_model: Override automatic routing
            task_type: "strategic", "workflow", "research"

        Returns: Response dict with content, model, cost, etc.
        """

        # Step 1: Classify complexity (unless model forced)
        if force_model:
            model = force_model
            complexity_score = None
        else:
            classification = await self.gemini.classify_complexity(prompt)
            complexity_score = classification["complexity_score"]
            category = classification["category"]

            # Route based on category
            if category in ["simple", "medium"]:
                model = "gemini-2.0-flash"
            elif category == "complex":
                model = "claude-sonnet-4-5"
            else:  # critical
                model = "claude-opus-4-5"

            # Override for task type
            if task_type == "strategic":
                model = "claude-opus-4-5"  # Always use best for strategic
            elif task_type == "financial":
                model = "claude-opus-4-5"  # Critical domain

        # Step 2: Generate with selected model
        start_time = datetime.now()

        if model == "gemini-2.0-flash":
            response = await self.gemini.generate(
                prompt=prompt,
                system_prompt=system_prompt
            )
        else:  # Claude models
            response = await self.claude.generate(
                prompt=prompt,
                model=model,
                system_prompt=system_prompt
            )

        end_time = datetime.now()
        latency_ms = int((end_time - start_time).total_seconds() * 1000)

        # Step 3: Log to database
        if user_id and session_id:
            await self._log_llm_call(
                user_id=user_id,
                session_id=session_id,
                model=response["model"],
                input_tokens=response["usage"]["input_tokens"],
                output_tokens=response["usage"]["output_tokens"],
                cost=response["cost"],
                latency_ms=latency_ms,
                task_type=task_type,
                complexity_score=complexity_score
            )

        response["latency_ms"] = latency_ms
        response["complexity_score"] = complexity_score

        return response

    async def _log_llm_call(
        self,
        user_id: str,
        session_id: str,
        model: str,
        input_tokens: int,
        output_tokens: int,
        cost: float,
        latency_ms: int,
        task_type: Optional[str],
        complexity_score: Optional[float]
    ):
        """Log LLM call to database for cost tracking"""

        with self.db.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO llm_calls
                    (user_id, session_id, model, input_tokens, output_tokens,
                     cost_usd, latency_ms, task_type, complexity_score)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    user_id,
                    session_id,
                    model,
                    input_tokens,
                    output_tokens,
                    cost,
                    latency_ms,
                    task_type,
                    complexity_score
                )
            )
            self.db.commit()

    async def get_cost_stats(self, user_id: str, days: int = 30) -> Dict:
        """
        Get cost statistics for user

        Returns:
        {
            "total_cost": 12.50,
            "total_calls": 1234,
            "by_model": {
                "gemini-2.0-flash": {"calls": 1000, "cost": 1.50},
                "claude-sonnet-4-5": {"calls": 100, "cost": 3.00},
                "claude-opus-4-5": {"calls": 134, "cost": 8.00}
            },
            "avg_latency_ms": 450,
            "model_distribution": {
                "gemini": 0.81,
                "claude-sonnet": 0.08,
                "claude-opus": 0.11
            }
        }
        """

        from psycopg2.extras import RealDictCursor

        with self.db.cursor(cursor_factory=RealDictCursor) as cursor:
            # Total stats
            cursor.execute(
                """
                SELECT
                    COUNT(*) as total_calls,
                    SUM(cost_usd) as total_cost,
                    AVG(latency_ms) as avg_latency
                FROM llm_calls
                WHERE user_id = %s
                  AND timestamp > NOW() - INTERVAL '%s days'
                """,
                (user_id, days)
            )
            totals = cursor.fetchone()

            # By model
            cursor.execute(
                """
                SELECT
                    model,
                    COUNT(*) as calls,
                    SUM(cost_usd) as cost,
                    AVG(latency_ms) as avg_latency
                FROM llm_calls
                WHERE user_id = %s
                  AND timestamp > NOW() - INTERVAL '%s days'
                GROUP BY model
                """,
                (user_id, days)
            )
            by_model = {row['model']: dict(row) for row in cursor.fetchall()}

            # Distribution
            total_calls = totals['total_calls'] or 1  # Avoid division by zero
            distribution = {}
            for model, stats in by_model.items():
                if 'gemini' in model.lower():
                    key = 'gemini'
                elif 'sonnet' in model.lower():
                    key = 'claude-sonnet'
                else:
                    key = 'claude-opus'

                distribution[key] = distribution.get(key, 0) + (stats['calls'] / total_calls)

            return {
                "total_cost": float(totals['total_cost'] or 0),
                "total_calls": totals['total_calls'] or 0,
                "by_model": by_model,
                "avg_latency_ms": int(totals['avg_latency'] or 0),
                "model_distribution": distribution
            }
