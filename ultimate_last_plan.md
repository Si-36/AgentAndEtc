# ULTIMATE AI-EOS PLAN: Persian Enterprise AI Operating System
**Version**: Final Synthesis - December 2025
**Build Timeline**: 10 Weeks
**Target**: Persian SMEs & Enterprise
**Revenue Goal**: $5K-10K MRR Week 2 → $1.5M ARR Year 1 → $50M+ Year 5

---

## EXECUTIVE SYNTHESIS

This plan synthesizes 7 comprehensive research documents and the latest December 2025 breakthroughs to create the definitive Persian AI Operating System. It combines:

- **Research-Validated Multi-Agent** (+50-80% improvement for strategic decisions)
- **Single-Agent Workflows** (-70% penalty avoided for sequential tasks)
- **Latest Technology** (Gemini 2.0 Flash FREE, Claude Opus 4.5, Agent Lightning, MCP)
- **Persian-First Design** (Cultural, linguistic, regulatory optimization)
- **Production Patterns** (Google ADK, Anthropic lessons, LangChain discipline)

### 7 Unfair Advantages

1. **Persian Monopoly**: First comprehensive Persian AI system (23M speakers, zero competition)
2. **Research-Validated Architecture**: Multi-agent where proven (+50-80%), single-agent otherwise
3. **Memory Moat**: Letta 3-tier system + Agent Lightning RL = institutional memory competitors can't replicate
4. **Latest Tech Stack**: Gemini 2.0 FREE (Dec 11, 2025), Agent Lightning (Dec 10), MCP (Dec 9)
5. **Context Engineering**: Google ADK 4-layer pattern (3x faster, 5x cheaper)
6. **Ship-to-Learn Discipline**: LangChain's new paradigm - revenue from Week 2, learn in production
7. **Hybrid Orchestration**: LangGraph for complex multi-agent, Swarm for simple handoffs

---

## ARCHITECTURAL OVERVIEW: 6-LAYER SYSTEM

```
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 1: ORCHESTRATION & ROUTING                                │
│ ├─ Google ADK Context Engineering (4-layer)                     │
│ ├─ LangGraph 1.0.5 Multi-Agent Orchestration                    │
│ ├─ OpenAI Swarm Simple Handoffs                                 │
│ └─ Task Router: Strategic → Multi-Agent, Workflow → Single      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 2: INTELLIGENCE LAYER                                     │
│ ├─ LLM Strategy: Gemini 2.0 Flash 80%, Claude Opus 15%, Sonnet 5%│
│ ├─ Gemini 2.0 Deep Research Agent (Dec 11, 2025)               │
│ ├─ Persian Optimization (Cultural + Linguistic + Regulatory)    │
│ └─ Cost: $100/month for 1000 queries (vs $200 Claude Teams)    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 3: STRATEGIC MULTI-AGENT (Centralized Debate)            │
│ ├─ Analyst Agent: Data gathering, research                      │
│ ├─ Strategist Agent: Plan generation, scenario modeling         │
│ ├─ Critic Agent: Risk analysis, challenge assumptions           │
│ ├─ Arbiter Agent: ConfMAD calibrated consensus                  │
│ └─ Research: +50-80% improvement, 4.4x error rate (best option) │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 4: MEMORY & LEARNING                                      │
│ ├─ Letta 3-Tier Memory (Core 2KB, Session 90d, Archival ∞)     │
│ ├─ Agent Lightning RL (Microsoft Dec 10, 2025)                  │
│ ├─ Self-Editing Memory (74% LoCoMo benchmark)                   │
│ └─ Training-Agent Disaggregation (TAD) + AIR Rewards            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 5: WORKFLOW AGENTS (Single-Agent, Tool-Heavy)            │
│ ├─ Email Agent: Gmail/Outlook integration, smart responses      │
│ ├─ Meeting Agent: Zoom/Teams scheduling, transcription          │
│ ├─ Document Agent: Google Docs/Word generation, editing         │
│ ├─ Calendar Agent: Smart scheduling, conflict resolution        │
│ ├─ Financial Agent: Expense tracking, invoice processing        │
│ └─ Research: -70% penalty when using multi-agent for workflows  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 6: FOUNDATION & PROTOCOLS                                 │
│ ├─ MCP (Model Context Protocol) - Tool standardization          │
│ ├─ AG-UI Protocol (CopilotKit) - Agent-UI streaming            │
│ ├─ AGENTS.md Manifesto - Discovery & composition                │
│ ├─ A2A Protocol - Agent-to-agent communication                  │
│ └─ Voice: WhatsApp, Telegram, Phone integration                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## TODO 1: FOUNDATION & INFRASTRUCTURE (WEEK 1-2)

### 1.1 CONTEXT ENGINEERING SETUP (Google ADK Pattern)

**Research Basis**: Google ADK "Context as Compiler" paradigm (Dec 2025) - 3x faster, 5x cheaper than naive RAG

#### 4-Layer Context Architecture Schema

```
┌─────────────────────────────────────────────────────────────┐
│ WORKING CONTEXT (Ephemeral, 10-20K tokens)                  │
│ ├─ Current conversation turn                                │
│ ├─ Immediately relevant facts from Memory layer             │
│ ├─ Task-specific instructions                               │
│ └─ THROWN AWAY after response - never stored                │
└─────────────────────────────────────────────────────────────┘
                       ↑
                  Compiled from:
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ SESSION CONTEXT (Permanent, append-only log)                │
│ ├─ Typed events: UserMessage, AssistantMessage, ToolCall    │
│ ├─ Structured JSON, no raw text dumps                       │
│ ├─ Agent-directed retrieval: "Give me last 10 messages"     │
│ └─ PostgreSQL with JSONB indexing                           │
└─────────────────────────────────────────────────────────────┘
                       ↑
                 Queries from:
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ MEMORY LAYER (Semantic search, long-term knowledge)         │
│ ├─ Letta Core Memory: 2KB editable profile (JSON schema)    │
│ ├─ Letta Archival: Unlimited semantic search (pgvector)     │
│ ├─ Self-editing: Agent modifies own Core Memory             │
│ └─ Retrieval: Only when agent explicitly requests           │
└─────────────────────────────────────────────────────────────┘
                       ↑
                On-demand loads:
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ ARTIFACTS (Large files, lazy loading)                        │
│ ├─ Company financial reports (PDF embeddings)               │
│ ├─ Product catalogs, inventory databases                    │
│ ├─ Legal documents, contracts                               │
│ └─ S3/R2 storage with presigned URLs                        │
└─────────────────────────────────────────────────────────────┘
```

#### How to Implement

**Step 1: Separate Storage from Presentation**
- **Storage**: Raw events in PostgreSQL JSONB
- **Presentation**: Compiled context per LLM call
- **Never**: Dump entire conversation history into prompt

**Step 2: Design Typed Event Schema**
```json
{
  "event_type": "UserMessage | AssistantMessage | ToolCall | MemoryEdit",
  "timestamp": "ISO8601",
  "session_id": "uuid",
  "payload": {
    // Type-specific structured data
  },
  "metadata": {
    "cost": 0.0023,
    "latency_ms": 450,
    "model": "gemini-2.0-flash"
  }
}
```

**Step 3: Implement Context Compiler**
```
Function: compile_working_context(session_id, current_message)
  1. Fetch last N session events (agent-determined, typically 10-20)
  2. Query Memory layer for relevant facts (semantic search on current_message)
  3. Load any referenced Artifacts (if agent requested via tool)
  4. Assemble into 10-20K token working context
  5. Send to LLM
  6. After response: Store new events to Session, discard Working Context
```

**Step 4: Persian-Specific Context Optimization**
- **Cultural Calendar**: Inject Jalali date, upcoming Persian holidays into Working Context
- **Business Context**: Iranian fiscal year (Farvardin 1 start), tax deadlines
- **Linguistic Context**: RTL formatting hints, formal/informal register detection

**Week 1 Deliverable**: PostgreSQL schema + context compiler function + test with 100-message conversation

---

### 1.2 LLM ROUTING & COST OPTIMIZATION

**Research Basis**: Gemini 2.0 Flash FREE tier (1,500 requests/day), Claude Opus 4.5 for synthesis

#### Routing Decision Tree Schema

```
User Request
    ↓
┌─────────────────────────────────────────────┐
│ Classifier: Request Complexity              │
│ ├─ Simple (FAQ, lookup): Gemini Flash       │
│ ├─ Medium (analysis, draft): Gemini Flash   │
│ ├─ Complex (synthesis, debate): Claude Opus │
│ └─ Critical (legal, finance): Claude Opus   │
└─────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────┐
│ Model Distribution Target                   │
│ ├─ Gemini 2.0 Flash: 80% of requests        │
│ │   Cost: FREE (1,500/day) then $0.01/1M    │
│ ├─ Claude Sonnet 4.5: 5% of requests        │
│ │   Cost: $3/MTok in, $15/MTok out          │
│ └─ Claude Opus 4.5: 15% of requests         │
│     Cost: $15/MTok in, $75/MTok out         │
└─────────────────────────────────────────────┘
    ↓
Cost for 1000 queries/month: ~$100
  vs Claude Teams: $200/user/month
  vs ChatGPT Teams: $300/user/month
```

#### How to Implement

**Step 1: Build Complexity Classifier**
- **Input**: User message + conversation context
- **Output**: Complexity score 0-10
- **Method**: Use Gemini Flash itself as classifier (FREE, fast)
```
Prompt: "Rate complexity 0-10: [message]. Consider: novelty, ambiguity, stakes, analysis depth."
Rules:
  - 0-3: Simple → Gemini Flash
  - 4-6: Medium → Gemini Flash (can handle up to 1M context)
  - 7-8: Complex → Claude Sonnet 4.5
  - 9-10: Critical → Claude Opus 4.5
```

**Step 2: Implement Fallback Chain**
- Try Gemini Flash first (FREE)
- If response confidence < 0.7 (detect with ConfMAD): Escalate to Claude
- If critical domain (financial, legal): Start with Claude Opus

**Step 3: Persian Language Optimization for Gemini**
- **Problem**: Gemini 2.0 has weaker Persian than GPT-4/Claude
- **Solution**: Hybrid approach
  - User input (Persian) → Translate to English → Gemini processing → Translate back to Persian
  - Use Google Translate API (FREE for <500K chars/month)
  - For native Persian: Use Claude for language-critical tasks

**Step 4: Caching Strategy**
- **Gemini**: Context caching (1M token context, $0.002/1M cached)
- **Claude**: Prompt caching (5-minute TTL, 90% discount on cached tokens)
- **Implementation**: Deduplicate system prompts, company knowledge base

**Week 1 Deliverable**: Routing function + cost tracking dashboard + test 100 requests with 80/5/15 distribution

---

### 1.3 ORCHESTRATION LAYER SETUP

**Research Basis**: LangGraph for multi-agent (400+ companies), OpenAI Swarm for simple handoffs

#### Hybrid Orchestration Schema

```
┌────────────────────────────────────────────────────────────────┐
│ TASK ROUTER (First Decision Point)                             │
│                                                                 │
│ Input: User request + context                                  │
│ Output: Route to Multi-Agent OR Single-Agent                   │
│                                                                 │
│ Rules:                                                          │
│ ├─ Strategic Decision (hiring, investment, pivot)              │
│ │   → Multi-Agent Debate (LangGraph)                           │
│ │                                                               │
│ ├─ Workflow Task (email, meeting, document)                    │
│ │   → Single Workflow Agent (Swarm handoff)                    │
│ │                                                               │
│ └─ Research Task (market analysis, competitor scan)            │
│     → Gemini Deep Research Agent                               │
└────────────────────────────────────────────────────────────────┘
           ↓                        ↓                      ↓
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────┐
│ LANGGRAPH        │  │ SWARM HANDOFF        │  │ GEMINI RESEARCH │
│ Multi-Agent      │  │ Single-Agent         │  │ Deep Dive       │
│                  │  │                      │  │                 │
│ Analyst          │  │ Email Agent          │  │ Multimodal      │
│    ↓             │  │    ↓                 │  │ Search          │
│ Strategist       │  │ (Simple function)    │  │    ↓            │
│    ↓             │  │    ↓                 │  │ Synthesis       │
│ Critic           │  │ Meeting Agent        │  │    ↓            │
│    ↓             │  │    ↓                 │  │ Report          │
│ Arbiter          │  │ Done                 │  │                 │
│    ↓             │  │                      │  │                 │
│ Consensus        │  │                      │  │                 │
└──────────────────┘  └──────────────────────┘  └─────────────────┘

Research-Validated Improvement:
  Multi-Agent: +50-80% for strategic decisions (4.4x error rate vs 17.2x independent)
  Single-Agent: Avoids -70% penalty for sequential tool-heavy workflows
```

#### How to Implement LangGraph Multi-Agent

**Step 1: Install LangGraph 1.0.5**
```bash
pip install langgraph==1.0.5 langchain-anthropic langchain-google-genai
```

**Step 2: Define Agent Graph Structure**
```python
from langgraph.graph import StateGraph, END

# State schema
class DebateState(TypedDict):
    user_request: str
    analyst_findings: str
    strategist_plans: List[str]
    critic_concerns: List[str]
    arbiter_decision: str
    confidence_scores: Dict[str, float]

# Graph structure
workflow = StateGraph(DebateState)

# Add nodes (agents)
workflow.add_node("analyst", analyst_agent)
workflow.add_node("strategist", strategist_agent)
workflow.add_node("critic", critic_agent)
workflow.add_node("arbiter", arbiter_agent)

# Add edges (flow)
workflow.set_entry_point("analyst")
workflow.add_edge("analyst", "strategist")
workflow.add_edge("strategist", "critic")
workflow.add_conditional_edges(
    "critic",
    should_continue_debate,  # Function checking if consensus reached
    {
        "continue": "strategist",  # Loop back for revision
        "finalize": "arbiter"       # Proceed to final decision
    }
)
workflow.add_edge("arbiter", END)
```

**Step 3: Implement Agent Functions**
```python
def analyst_agent(state: DebateState) -> DebateState:
    """
    Role: Data gathering, research, fact-checking
    Model: Gemini 2.0 Flash (FREE, multimodal)
    """
    prompt = f"""
    You are an Analyst agent in a multi-agent debate.

    User Request: {state['user_request']}

    Your job:
    1. Gather relevant data and facts
    2. Identify key stakeholders and constraints
    3. Surface assumptions that need validation

    Output structured JSON:
    {{
      "facts": [...],
      "stakeholders": [...],
      "assumptions": [...],
      "data_sources": [...]
    }}
    """

    # Call Gemini with structured output
    response = gemini_client.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )

    state['analyst_findings'] = response.text
    return state

def strategist_agent(state: DebateState) -> DebateState:
    """
    Role: Generate strategic plans, scenario modeling
    Model: Claude Sonnet 4.5 (better reasoning)
    """
    prompt = f"""
    You are a Strategist in a multi-agent debate.

    Analyst Findings: {state['analyst_findings']}
    Previous Critic Concerns: {state.get('critic_concerns', 'None yet')}

    Generate 3 strategic options:
    1. Conservative (low risk, moderate return)
    2. Balanced (medium risk, good return)
    3. Aggressive (high risk, high return)

    For each option, specify:
    - Implementation steps
    - Resource requirements
    - Success metrics
    - Risk factors
    """

    response = claude_client.messages.create(
        model="claude-sonnet-4-5-20250929",
        messages=[{"role": "user", "content": prompt}]
    )

    state['strategist_plans'] = extract_plans(response.content)
    return state

def critic_agent(state: DebateState) -> DebateState:
    """
    Role: Challenge assumptions, identify risks, devil's advocate
    Model: Claude Opus 4.5 (deepest reasoning)
    """
    prompt = f"""
    You are a Critic in a multi-agent debate.

    Strategist Plans: {state['strategist_plans']}

    Your job: Challenge every assumption. Identify risks.

    For each plan:
    1. What could go wrong?
    2. What are we NOT seeing?
    3. What biases might be affecting this analysis?
    4. What's the worst-case scenario?

    Be brutally honest. Score each plan on risk (0-10).
    """

    response = claude_client.messages.create(
        model="claude-opus-4-5-20251101",
        messages=[{"role": "user", "content": prompt}]
    )

    state['critic_concerns'] = extract_concerns(response.content)
    return state

def arbiter_agent(state: DebateState) -> DebateState:
    """
    Role: Synthesize debate, make final decision with ConfMAD calibration
    Model: Claude Opus 4.5 (synthesis)
    """
    prompt = f"""
    You are the Arbiter making the final decision.

    Full debate context:
    - Analyst: {state['analyst_findings']}
    - Strategist: {state['strategist_plans']}
    - Critic: {state['critic_concerns']}

    Synthesize into a single recommendation:
    1. Which plan is best and why?
    2. How to mitigate the Critic's concerns?
    3. What are the key decision points?
    4. Confidence level (0-100%)?
    """

    response = claude_client.messages.create(
        model="claude-opus-4-5-20251101",
        messages=[{"role": "user", "content": prompt}]
    )

    state['arbiter_decision'] = response.content
    state['confidence_scores'] = apply_confmad_calibration(response.content)
    return state
```

**Step 4: ConfMAD Confidence Calibration**
```python
def apply_confmad_calibration(arbiter_output: str) -> Dict[str, float]:
    """
    Research: ConfMAD paper (Oct 2024) - Platt scaling per model

    Problem: Models overconfident (claim 90% but actually 60%)
    Solution: Calibrate each model's confidence scores
    """

    # Extract raw confidence from arbiter output
    raw_confidence = extract_confidence(arbiter_output)  # e.g., 0.85

    # Platt scaling parameters (learned from validation set)
    # These need to be trained for each model
    platt_params = {
        "claude-opus-4-5": {"a": 0.8, "b": -0.2},  # Opus tends to overestimate
        "claude-sonnet-4-5": {"a": 1.1, "b": 0.1},  # Sonnet underestimates
        "gemini-2.0-flash": {"a": 0.9, "b": 0.0}
    }

    model = "claude-opus-4-5"
    a, b = platt_params[model]["a"], platt_params[model]["b"]

    # Calibrated confidence = sigmoid(a * logit(raw) + b)
    import math
    logit = math.log(raw_confidence / (1 - raw_confidence))
    calibrated_logit = a * logit + b
    calibrated_confidence = 1 / (1 + math.exp(-calibrated_logit))

    return {
        "raw": raw_confidence,
        "calibrated": calibrated_confidence,
        "model": model
    }
```

#### How to Implement Swarm Handoffs (Simple Workflows)

**Step 1: Install OpenAI Swarm**
```bash
pip install git+https://github.com/openai/swarm.git
```

**Step 2: Define Workflow Agents**
```python
from swarm import Swarm, Agent

# Email agent
email_agent = Agent(
    name="Email Agent",
    instructions="""
    You handle all email-related tasks:
    - Drafting emails
    - Summarizing inbox
    - Suggesting replies

    Use Gmail API tool to read/send emails.
    If task is not email-related, transfer to appropriate agent.
    """,
    functions=[read_gmail, send_email, draft_reply]
)

# Meeting agent
meeting_agent = Agent(
    name="Meeting Agent",
    instructions="""
    You handle meeting tasks:
    - Scheduling on Google Calendar
    - Zoom link generation
    - Meeting transcription summary

    Use Calendar API and Zoom API tools.
    """,
    functions=[create_calendar_event, generate_zoom_link, summarize_transcript]
)

# Transfer functions (simple handoffs)
def transfer_to_email():
    return email_agent

def transfer_to_meeting():
    return meeting_agent

# Add transfer capabilities
email_agent.functions.append(transfer_to_meeting)
meeting_agent.functions.append(transfer_to_email)

# Run Swarm
client = Swarm()
response = client.run(
    agent=email_agent,  # Start with email agent
    messages=[{"role": "user", "content": "Schedule a meeting tomorrow at 3pm and email participants"}]
)
# Swarm automatically handles: email_agent → meeting_agent → email_agent
```

**Step 3: Task Router Logic**
```python
def route_task(user_request: str, context: dict) -> str:
    """
    Decide: Multi-Agent Debate vs Single Workflow Agent

    Research basis:
    - Multi-agent: +50-80% for strategic decisions
    - Single-agent: Avoids -70% penalty for workflows
    """

    # Use Gemini Flash as classifier (FREE)
    classifier_prompt = f"""
    Classify this task:

    User: {user_request}
    Context: {context}

    Categories:
    1. STRATEGIC: Hiring, investment, business pivot, high-stakes decision
       → Requires multi-agent debate

    2. WORKFLOW: Email, meeting, document, calendar, routine operation
       → Single-agent with tools

    3. RESEARCH: Market analysis, competitor scan, deep dive
       → Gemini Deep Research Agent

    Output JSON: {{"category": "STRATEGIC|WORKFLOW|RESEARCH", "confidence": 0-1}}
    """

    response = gemini_client.generate_content(
        classifier_prompt,
        generation_config={"response_mime_type": "application/json"}
    )

    classification = json.loads(response.text)

    if classification['category'] == 'STRATEGIC':
        return 'langgraph_multi_agent'
    elif classification['category'] == 'WORKFLOW':
        return 'swarm_single_agent'
    else:
        return 'gemini_deep_research'
```

**Week 1-2 Deliverable**: LangGraph multi-agent setup + Swarm workflow agents + task router + test 50 diverse requests

---

### 1.4 PERSIAN OPTIMIZATION LAYER

**Research Basis**: Persian is unique in cultural calendar (Jalali), linguistic structure (RTL, formal/informal), regulatory environment (sanctions)

#### Persian-Specific Adaptations Schema

```
┌──────────────────────────────────────────────────────────────┐
│ CULTURAL OPTIMIZATION                                         │
│ ├─ Calendar: Jalali ↔ Gregorian conversion                   │
│ │   Current: 1404/09/25 (Azar 25, 1404)                      │
│ │   Holidays: Nowruz, Yalda, Chaharshanbeh Suri context      │
│ │                                                             │
│ ├─ Business Context: Iranian fiscal year (Farvardin 1 start) │
│ │   Tax deadlines, quarterly reporting in Jalali             │
│ │                                                             │
│ └─ Names & Titles: Persian naming conventions                │
│     آقا/خانم (Mr/Ms), formal register detection              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ LINGUISTIC OPTIMIZATION                                       │
│ ├─ RTL Formatting: HTML dir="rtl", CSS text-align            │
│ │                                                             │
│ ├─ Formal/Informal Register:                                 │
│ │   Detection: شما vs تو                                     │
│ │   Response matching: Mirror user's formality               │
│ │                                                             │
│ ├─ Idioms & Expressions:                                     │
│ │   "چشم" (formal yes), "بله" (standard yes)                │
│ │   Business idioms: "به سلامتی" (to health = congratulations)│
│ │                                                             │
│ └─ Translation Strategy:                                     │
│     Input (Persian) → English processing → Persian output    │
│     Use Claude for language-critical, Gemini for logic       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ REGULATORY OPTIMIZATION                                       │
│ ├─ Sanctions Compliance:                                     │
│ │   No direct payment to US services (Stripe, PayPal)        │
│ │   Solution: Crypto (USDT), local payment (ZarinPal)        │
│ │                                                             │
│ ├─ Data Residency:                                           │
│ │   Option 1: Host in UAE/Turkey (low latency to Iran)       │
│ │   Option 2: VPN-friendly architecture                      │
│ │                                                             │
│ └─ Legal Framework:                                          │
│     GDPR-equivalent for Iranian customers                    │
│     Persian-language terms of service                        │
└──────────────────────────────────────────────────────────────┘
```

#### How to Implement

**Step 1: Jalali Calendar Integration**
```python
from persiantools.jdatetime import JalaliDate
import datetime

def get_persian_context() -> dict:
    """
    Inject Persian cultural context into every LLM call
    """
    today_gregorian = datetime.date.today()
    today_jalali = JalaliDate(today_gregorian)

    # Upcoming Persian holidays
    holidays = get_upcoming_holidays(today_jalali)

    return {
        "current_date_jalali": str(today_jalali),  # "1404/09/25"
        "current_date_gregorian": str(today_gregorian),
        "weekday_persian": today_jalali.strftime("%A"),  # "دوشنبه"
        "upcoming_holidays": holidays,  # [{"name": "Nowruz", "date": "1405/01/01", "days_away": 97}]
        "fiscal_year": f"FY{today_jalali.year}",
        "quarter": f"Q{(today_jalali.month - 1) // 3 + 1}"
    }

def get_upcoming_holidays(current_date: JalaliDate, lookahead_days=90):
    """
    Persian holidays relevant to business
    """
    holidays = [
        {"name": "Nowruz", "month": 1, "day": 1, "description": "Persian New Year"},
        {"name": "Sizdah Bedar", "month": 1, "day": 13, "description": "Nature Day"},
        {"name": "Yalda", "month": 10, "day": 1, "description": "Winter solstice celebration"},
        # Add more...
    ]

    upcoming = []
    for holiday in holidays:
        holiday_date = JalaliDate(current_date.year, holiday["month"], holiday["day"])
        if holiday_date < current_date:
            holiday_date = JalaliDate(current_date.year + 1, holiday["month"], holiday["day"])

        days_away = (holiday_date - current_date).days
        if days_away <= lookahead_days:
            upcoming.append({
                "name": holiday["name"],
                "date": str(holiday_date),
                "days_away": days_away,
                "description": holiday["description"]
            })

    return sorted(upcoming, key=lambda x: x["days_away"])
```

**Step 2: Formal/Informal Register Detection**
```python
def detect_formality(persian_text: str) -> str:
    """
    Detect if user is using formal (شما) or informal (تو) register
    """
    formal_markers = ["شما", "هستید", "کنید", "بفرمایید"]
    informal_markers = ["تو", "هستی", "کن", "بگو"]

    formal_count = sum(marker in persian_text for marker in formal_markers)
    informal_count = sum(marker in persian_text for marker in informal_markers)

    if formal_count > informal_count:
        return "formal"
    elif informal_count > formal_count:
        return "informal"
    else:
        return "formal"  # Default to formal in business context

def inject_formality_instruction(user_message: str) -> str:
    """
    Add instruction to LLM to match user's formality
    """
    formality = detect_formality(user_message)

    instruction = f"""
    USER LANGUAGE PREFERENCE: {formality.upper()}

    Important: Respond in Persian using {formality} register.
    - Formal: Use شما, هستید, بفرمایید
    - Informal: Use تو, هستی, بگو

    Match the user's tone exactly.
    """

    return instruction
```

**Step 3: Translation Strategy for Gemini**
```python
async def process_with_gemini(persian_input: str) -> str:
    """
    Gemini 2.0 has weaker Persian than Claude.
    Strategy: Translate to English, process, translate back.
    """

    # Step 1: Translate Persian → English (Google Translate API, FREE)
    english_input = await translate(persian_input, target='en')

    # Step 2: Process with Gemini (FREE)
    english_output = gemini_client.generate_content(
        f"Context: This is translated from Persian business query.\n\n{english_input}"
    )

    # Step 3: Translate back English → Persian
    persian_output = await translate(english_output.text, target='fa')

    # Step 4: Post-process for Persian idioms
    persian_output = apply_persian_idioms(persian_output)

    return persian_output

def apply_persian_idioms(text: str) -> str:
    """
    Replace English business idioms with Persian equivalents
    """
    replacements = {
        "Congratulations": "تبریک می‌گویم / به سلامتی",
        "Thank you": "متشکرم / سپاس",
        "You're welcome": "خواهش می‌کنم",
        "Good luck": "موفق باشید",
        # Add more contextual replacements
    }

    for eng, fa in replacements.items():
        text = text.replace(eng, fa)

    return text
```

**Step 4: RTL UI Support**
```html
<!-- Inject into all UI responses -->
<div dir="rtl" lang="fa" style="text-align: right; font-family: 'Vazir', 'Tahoma', sans-serif;">
    <!-- Persian content here -->
</div>
```

**Week 2 Deliverable**: Persian context injection + formality detection + translation pipeline + 100 test queries in Persian

---

### 1.5 DATABASE SCHEMA & SESSION MANAGEMENT

#### PostgreSQL Schema for 4-Layer Context

```sql
-- Session events (append-only log)
CREATE TABLE session_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL,
    user_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'UserMessage', 'AssistantMessage', 'ToolCall', etc.
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    payload JSONB NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Indexes
    INDEX idx_session_events_session_id (session_id),
    INDEX idx_session_events_timestamp (timestamp),
    INDEX idx_session_events_type (event_type)
);

-- Letta Core Memory (editable, per user)
CREATE TABLE letta_core_memory (
    user_id UUID PRIMARY KEY,
    core_memory JSONB NOT NULL,  -- Max 2KB
    last_edited_at TIMESTAMPTZ DEFAULT NOW(),
    edit_count INT DEFAULT 0,

    -- Enforce 2KB limit
    CONSTRAINT core_memory_size CHECK (pg_column_size(core_memory) <= 2048)
);

-- Example Core Memory structure
{
    "persona": {
        "name": "Ali Rezaei",
        "company": "Tehran Tech Solutions",
        "role": "CEO",
        "preferences": {
            "formality": "formal",
            "calendar": "jalali",
            "language": "persian"
        }
    },
    "context": {
        "current_projects": ["ERP Migration", "Marketing Campaign Q1"],
        "key_goals": ["Reduce costs 15%", "Hire 3 engineers"],
        "recent_decisions": [
            {"decision": "Switch to Google Workspace", "date": "1404/08/15", "rationale": "Better collaboration"}
        ]
    }
}

-- Letta Archival Memory (unlimited, semantic search)
CREATE TABLE letta_archival_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),  -- pgvector for semantic search
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,

    INDEX idx_archival_user_id (user_id),
    INDEX idx_archival_embedding vector_cosine_ops (embedding)
);

-- Artifacts (large files, lazy loading)
CREATE TABLE artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    artifact_type VARCHAR(50) NOT NULL,  -- 'pdf', 'spreadsheet', 'report'
    s3_key VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,

    INDEX idx_artifacts_user_id (user_id),
    INDEX idx_artifacts_type (artifact_type)
);

-- Agent Learning (for Agent Lightning RL)
CREATE TABLE agent_training_episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100) NOT NULL,
    episode_data JSONB NOT NULL,  -- State-action-reward tuples
    reward FLOAT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    INDEX idx_training_agent (agent_name),
    INDEX idx_training_timestamp (timestamp)
);
```

**Week 2 Deliverable**: PostgreSQL setup + migrations + seed test data + backup strategy

---

## TODO 2: INTELLIGENCE & MEMORY (WEEK 3-4)

### 2.1 LETTA MEMORY SYSTEM INTEGRATION

**Research Basis**: Letta 3-tier memory (74% LoCoMo benchmark), self-editing agents, 90-day session retention

#### Letta Architecture Schema

```
┌──────────────────────────────────────────────────────────────────┐
│ TIER 1: CORE MEMORY (2KB, Editable, Always in Context)          │
│                                                                  │
│ Structure (JSON Schema):                                         │
│ {                                                                │
│   "persona": {                                                   │
│     "name": "User's name",                                       │
│     "company": "Company name",                                   │
│     "role": "Job title",                                         │
│     "preferences": {...}                                         │
│   },                                                             │
│   "context": {                                                   │
│     "current_projects": [...],                                   │
│     "key_goals": [...],                                          │
│     "recent_decisions": [...]                                    │
│   }                                                              │
│ }                                                                │
│                                                                  │
│ Agent can EDIT this memory via tool:                            │
│   edit_core_memory(field="context.key_goals", value=[...])      │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ TIER 2: SESSION MEMORY (90 days, Append-Only)                   │
│                                                                  │
│ All events since session start:                                  │
│ ├─ UserMessage events                                           │
│ ├─ AssistantMessage events                                      │
│ ├─ ToolCall events                                              │
│ └─ MemoryEdit events                                            │
│                                                                  │
│ Agent can QUERY this memory via tool:                           │
│   get_session_history(last_n=20, filter_type="UserMessage")    │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ TIER 3: ARCHIVAL MEMORY (Unlimited, Semantic Search)            │
│                                                                  │
│ Long-term knowledge:                                             │
│ ├─ Past conversations (>90 days)                                │
│ ├─ Company knowledge base                                       │
│ ├─ Industry research                                            │
│ └─ User-uploaded documents                                      │
│                                                                  │
│ Agent can SEARCH this memory via tool:                          │
│   search_archival(query="hiring strategy 2023", limit=5)       │
│                                                                  │
│ Implementation: pgvector with OpenAI embeddings                 │
└──────────────────────────────────────────────────────────────────┘
```

#### How to Implement

**Step 1: Install Letta**
```bash
pip install letta==0.3.0
```

**Step 2: Define Core Memory Schema**
```python
from pydantic import BaseModel, Field
from typing import List, Dict

class PersonaMemory(BaseModel):
    name: str
    company: str
    role: str
    preferences: Dict[str, str] = Field(default_factory=dict)

class ContextMemory(BaseModel):
    current_projects: List[str] = Field(default_factory=list)
    key_goals: List[str] = Field(default_factory=list)
    recent_decisions: List[Dict] = Field(default_factory=list)

class CoreMemory(BaseModel):
    persona: PersonaMemory
    context: ContextMemory

    def to_json(self) -> dict:
        return self.model_dump()

    def size_bytes(self) -> int:
        import json
        return len(json.dumps(self.to_json()))

    def enforce_2kb_limit(self):
        """Truncate if over 2KB"""
        while self.size_bytes() > 2048:
            # Remove oldest decision
            if self.context.recent_decisions:
                self.context.recent_decisions.pop(0)
            else:
                break
```

**Step 3: Implement Memory Editing Tool**
```python
def edit_core_memory_tool(user_id: str, field: str, value: any):
    """
    Tool that agents can call to edit their own Core Memory

    Examples:
      edit_core_memory("persona.name", "Ali Rezaei")
      edit_core_memory("context.key_goals", ["Reduce costs 15%", "Hire 3 engineers"])
    """

    # Load current Core Memory
    core_memory = load_core_memory(user_id)

    # Parse field path (e.g., "context.key_goals")
    parts = field.split('.')

    # Navigate to field
    obj = core_memory
    for part in parts[:-1]:
        obj = getattr(obj, part)

    # Set value
    setattr(obj, parts[-1], value)

    # Enforce 2KB limit
    core_memory.enforce_2kb_limit()

    # Save to database
    save_core_memory(user_id, core_memory)

    return f"Core Memory updated: {field} = {value}"

def load_core_memory(user_id: str) -> CoreMemory:
    """Load from PostgreSQL"""
    result = db.execute(
        "SELECT core_memory FROM letta_core_memory WHERE user_id = %s",
        (user_id,)
    ).fetchone()

    if result:
        return CoreMemory(**result['core_memory'])
    else:
        # Initialize default
        return CoreMemory(
            persona=PersonaMemory(name="", company="", role="", preferences={}),
            context=ContextMemory()
        )

def save_core_memory(user_id: str, core_memory: CoreMemory):
    """Save to PostgreSQL"""
    db.execute(
        """
        INSERT INTO letta_core_memory (user_id, core_memory, last_edited_at, edit_count)
        VALUES (%s, %s, NOW(), 1)
        ON CONFLICT (user_id) DO UPDATE SET
            core_memory = EXCLUDED.core_memory,
            last_edited_at = NOW(),
            edit_count = letta_core_memory.edit_count + 1
        """,
        (user_id, core_memory.to_json())
    )
```

**Step 4: Implement Archival Memory Search**
```python
import openai
import numpy as np

def search_archival_tool(user_id: str, query: str, limit: int = 5) -> List[str]:
    """
    Semantic search in Archival Memory

    Agent calls this when it needs to recall distant past
    """

    # Generate embedding for query
    query_embedding = openai.embeddings.create(
        model="text-embedding-3-small",  # $0.02/1M tokens
        input=query
    ).data[0].embedding

    # Search in pgvector
    results = db.execute(
        """
        SELECT content, metadata,
               1 - (embedding <=> %s::vector) AS similarity
        FROM letta_archival_memory
        WHERE user_id = %s
        ORDER BY embedding <=> %s::vector
        LIMIT %s
        """,
        (query_embedding, user_id, query_embedding, limit)
    ).fetchall()

    return [
        {
            "content": r['content'],
            "similarity": r['similarity'],
            "metadata": r['metadata']
        }
        for r in results
    ]

def store_in_archival(user_id: str, content: str, metadata: dict = None):
    """
    Store conversation or document in Archival Memory
    Called automatically after 90 days or when session ends
    """

    # Generate embedding
    embedding = openai.embeddings.create(
        model="text-embedding-3-small",
        input=content
    ).data[0].embedding

    # Store
    db.execute(
        """
        INSERT INTO letta_archival_memory (user_id, content, embedding, metadata)
        VALUES (%s, %s, %s, %s)
        """,
        (user_id, content, embedding, metadata or {})
    )
```

**Step 5: Memory Management Lifecycle**
```python
def memory_lifecycle_manager():
    """
    Background job to manage memory tiers

    Rules:
    1. Session events older than 90 days → Archive
    2. Core Memory edits every conversation → Log
    3. Archival grows unlimited (cost: ~$1/1M tokens for embeddings)
    """

    # Archive old sessions
    old_sessions = db.execute(
        """
        SELECT session_id, user_id,
               array_agg(payload ORDER BY timestamp) as events
        FROM session_events
        WHERE timestamp < NOW() - INTERVAL '90 days'
        GROUP BY session_id, user_id
        """
    ).fetchall()

    for session in old_sessions:
        # Combine events into narrative
        narrative = combine_events_to_narrative(session['events'])

        # Store in archival
        store_in_archival(
            user_id=session['user_id'],
            content=narrative,
            metadata={"session_id": session['session_id'], "archived_at": "2025-12-15"}
        )

        # Delete from session_events
        db.execute(
            "DELETE FROM session_events WHERE session_id = %s",
            (session['session_id'],)
        )

def combine_events_to_narrative(events: List[dict]) -> str:
    """
    Use LLM to summarize session events into archival narrative
    """
    prompt = f"""
    Summarize this conversation session into a concise narrative for long-term memory.

    Events: {events}

    Output a 2-3 paragraph summary capturing:
    1. Main topics discussed
    2. Decisions made
    3. Action items
    4. Key insights
    """

    response = gemini_client.generate_content(prompt)
    return response.text
```

**Week 3 Deliverable**: Letta 3-tier memory fully functional + memory editing + archival search + 90-day lifecycle test

---

### 2.2 AGENT LIGHTNING RL INTEGRATION

**Research Basis**: Microsoft Agent Lightning (Dec 10, 2025) - RL training without code rewrites, TAD + AIR

#### Agent Lightning Schema

```
┌────────────────────────────────────────────────────────────────┐
│ TRAINING-AGENT DISAGGREGATION (TAD)                            │
│                                                                │
│ Problem: Training agent also runs in production = slow         │
│ Solution: Separate training agent from production agent        │
│                                                                │
│ ┌─────────────────┐           ┌──────────────────┐           │
│ │ Production Agent│           │ Training Agent   │           │
│ │ (Fast inference)│           │ (Learns offline) │           │
│ │                 │           │                  │           │
│ │ Gemini Flash    │  Logs →  │ Claude Opus      │           │
│ │ No RL overhead  │           │ RL training      │           │
│ └─────────────────┘           └──────────────────┘           │
│                                        ↓                       │
│                                   Update policy                │
│                                        ↓                       │
│                            Production agent learns             │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ AUTOMATIC INTERMEDIATE REWARDING (AIR)                         │
│                                                                │
│ Problem: Only final reward = slow learning                     │
│ Solution: LLM generates intermediate rewards                   │
│                                                                │
│ Episode: User asks "Find cheapest supplier for X"             │
│                                                                │
│ Step 1: Agent searches suppliers                              │
│   → AIR: "Good start, relevant search" → +0.3                 │
│                                                                │
│ Step 2: Agent compares prices                                 │
│   → AIR: "Correct comparison logic" → +0.5                    │
│                                                                │
│ Step 3: Agent recommends cheapest                             │
│   → Final reward: "Perfect answer" → +1.0                     │
│                                                                │
│ Total reward: 1.8 (vs 1.0 without AIR)                        │
│ Learning: 3x faster convergence                               │
└────────────────────────────────────────────────────────────────┘
```

#### How to Implement

**Step 1: Set Up TAD (Training-Agent Disaggregation)**
```python
class ProductionAgent:
    """
    Fast inference agent, runs in production
    No RL training overhead
    """
    def __init__(self):
        self.model = "gemini-2.0-flash"  # FREE, fast
        self.policy = load_latest_policy()  # Learned policy from training agent

    def run(self, user_request: str) -> str:
        # Log episode for training agent
        episode_id = log_episode_start(user_request)

        # Execute with current policy
        response = self.execute_with_policy(user_request)

        # Log actions taken
        log_episode_actions(episode_id, self.actions)

        return response

class TrainingAgent:
    """
    Offline learning agent, trains on logged episodes
    Never blocks production
    """
    def __init__(self):
        self.model = "claude-opus-4-5"  # Better reasoning for RL
        self.policy = Policy()

    def train_on_episodes(self, episodes: List[Episode]):
        """
        Called periodically (every 100 episodes)
        """
        for episode in episodes:
            # Generate intermediate rewards with AIR
            rewards = self.generate_intermediate_rewards(episode)

            # Update policy
            self.policy.update(episode, rewards)

        # Save updated policy
        save_policy(self.policy)

        # Production agent picks up new policy automatically

def log_episode_start(user_request: str) -> str:
    """Log to database for training agent"""
    episode_id = str(uuid.uuid4())
    db.execute(
        """
        INSERT INTO agent_training_episodes (id, agent_name, episode_data, timestamp)
        VALUES (%s, 'production_agent', %s, NOW())
        """,
        (episode_id, {"request": user_request, "actions": []})
    )
    return episode_id

def load_latest_policy() -> Policy:
    """Production agent loads latest trained policy"""
    policy_data = db.execute(
        """
        SELECT policy_weights FROM agent_policies
        ORDER BY trained_at DESC LIMIT 1
        """
    ).fetchone()

    return Policy.from_weights(policy_data['policy_weights'])
```

**Step 2: Implement AIR (Automatic Intermediate Rewarding)**
```python
def generate_intermediate_rewards(episode: Episode) -> List[float]:
    """
    Use LLM to generate rewards for each step in episode

    Research: AIR paper shows 3x faster convergence
    """

    prompt = f"""
    You are a reward model for reinforcement learning.

    Task: {episode.user_request}

    Agent Actions:
    {format_actions(episode.actions)}

    Final Outcome: {episode.final_result}
    User Satisfaction: {episode.user_feedback}  # thumbs up/down

    For each action, rate 0-1:
    - 0: Harmful/wrong direction
    - 0.5: Neutral/unclear
    - 1.0: Perfect step toward goal

    Output JSON array: [0.3, 0.7, 0.5, 1.0, ...]
    """

    response = claude_client.messages.create(
        model="claude-opus-4-5",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json"}
    )

    rewards = json.loads(response.content[0].text)

    # Final reward from user feedback
    final_reward = 1.0 if episode.user_feedback == "thumbs_up" else -1.0
    rewards.append(final_reward)

    return rewards

def collect_user_feedback(episode_id: str):
    """
    After each response, ask user for feedback
    """
    # In UI: Show thumbs up/down buttons
    # Store in database
    db.execute(
        """
        UPDATE agent_training_episodes
        SET episode_data = jsonb_set(episode_data, '{user_feedback}', %s)
        WHERE id = %s
        """,
        ('"thumbs_up"', episode_id)  # or "thumbs_down"
    )
```

**Step 3: Policy Update Logic**
```python
class Policy:
    """
    Simple policy: Maps (state, context) → action probabilities
    """
    def __init__(self):
        self.weights = {}  # Action → weight mapping

    def get_action_probabilities(self, state: dict, context: dict) -> dict:
        """
        Given current state, return probability distribution over actions
        """
        # Simple implementation: Softmax over weighted actions
        import numpy as np

        action_scores = {}
        for action in POSSIBLE_ACTIONS:
            # Score = weighted sum of state features
            score = sum(
                self.weights.get(f"{action}_{feature}", 0.0) * value
                for feature, value in state.items()
            )
            action_scores[action] = score

        # Softmax
        scores = np.array(list(action_scores.values()))
        probs = np.exp(scores) / np.sum(np.exp(scores))

        return dict(zip(action_scores.keys(), probs))

    def update(self, episode: Episode, rewards: List[float]):
        """
        Update weights based on episode and intermediate rewards

        Simple algorithm: Increase weights for rewarded actions
        """
        for action, reward in zip(episode.actions, rewards):
            # Increase weight if positive reward
            for feature, value in episode.state.items():
                key = f"{action.name}_{feature}"
                self.weights[key] = self.weights.get(key, 0.0) + (reward * value * 0.01)  # Learning rate 0.01

POSSIBLE_ACTIONS = [
    "search_archival_memory",
    "edit_core_memory",
    "call_tool",
    "ask_clarifying_question",
    "provide_answer"
]
```

**Step 4: Training Loop (Background Job)**
```python
import schedule
import time

def training_loop():
    """
    Background job: Train on collected episodes every hour
    """
    training_agent = TrainingAgent()

    while True:
        # Fetch untrained episodes
        episodes = db.execute(
            """
            SELECT * FROM agent_training_episodes
            WHERE trained = FALSE
            ORDER BY timestamp
            LIMIT 100
            """
        ).fetchall()

        if episodes:
            print(f"Training on {len(episodes)} episodes...")
            training_agent.train_on_episodes(episodes)

            # Mark as trained
            db.execute(
                """
                UPDATE agent_training_episodes
                SET trained = TRUE
                WHERE id = ANY(%s)
                """,
                ([ep['id'] for ep in episodes],)
            )

        # Wait 1 hour
        time.sleep(3600)

# Run in background
import threading
training_thread = threading.Thread(target=training_loop, daemon=True)
training_thread.start()
```

**Week 4 Deliverable**: TAD setup + AIR reward generation + policy learning + test with 1000 episodes

---

### 2.3 CONFMAD CONFIDENCE CALIBRATION

**Research Basis**: ConfMAD paper (Oct 2024) - Multi-agent confidence calibration with Platt scaling

#### ConfMAD Implementation

```python
import numpy as np
from scipy.special import expit  # Sigmoid function

class ConfMADCalibrator:
    """
    Calibrates confidence scores from multi-agent debate

    Problem: Models overconfident (say 90% but actually 60%)
    Solution: Learn calibration per model from validation set
    """

    def __init__(self):
        # Platt scaling parameters (learned from validation)
        self.calibration_params = {
            "claude-opus-4-5": {"a": 0.8, "b": -0.2},  # Tends to overestimate
            "claude-sonnet-4-5": {"a": 1.1, "b": 0.1},  # Tends to underestimate
            "gemini-2.0-flash": {"a": 0.9, "b": 0.0}
        }

    def calibrate_confidence(self, raw_confidence: float, model: str) -> float:
        """
        Apply Platt scaling: calibrated = sigmoid(a * logit(raw) + b)
        """
        params = self.calibration_params.get(model, {"a": 1.0, "b": 0.0})
        a, b = params["a"], params["b"]

        # Avoid log(0) and log(1)
        raw_confidence = np.clip(raw_confidence, 0.01, 0.99)

        # Logit transform
        logit = np.log(raw_confidence / (1 - raw_confidence))

        # Calibrated logit
        calibrated_logit = a * logit + b

        # Sigmoid back to probability
        calibrated = expit(calibrated_logit)

        return float(calibrated)

    def aggregate_agent_confidences(self, agent_outputs: List[dict]) -> dict:
        """
        Aggregate confidence scores from multiple agents

        Input:
          [
            {"agent": "Analyst", "model": "gemini-2.0-flash", "confidence": 0.85},
            {"agent": "Strategist", "model": "claude-sonnet-4-5", "confidence": 0.75},
            {"agent": "Critic", "model": "claude-opus-4-5", "confidence": 0.65}
          ]

        Output:
          {
            "consensus_confidence": 0.72,
            "calibrated_confidences": [0.78, 0.81, 0.58],
            "recommendation": "Medium confidence - consider human review"
          }
        """

        # Calibrate each agent's confidence
        calibrated = []
        for output in agent_outputs:
            cal_conf = self.calibrate_confidence(output['confidence'], output['model'])
            calibrated.append(cal_conf)

        # Aggregate: Mean of calibrated confidences
        consensus_confidence = np.mean(calibrated)

        # Decision thresholds
        if consensus_confidence >= 0.8:
            recommendation = "High confidence - proceed automatically"
        elif consensus_confidence >= 0.6:
            recommendation = "Medium confidence - consider human review"
        else:
            recommendation = "Low confidence - REQUIRE human review"

        return {
            "consensus_confidence": float(consensus_confidence),
            "calibrated_confidences": calibrated,
            "raw_confidences": [o['confidence'] for o in agent_outputs],
            "recommendation": recommendation
        }

    def train_calibration_params(self, validation_set: List[dict]):
        """
        Learn Platt scaling parameters from validation set

        Validation set format:
        [
          {
            "model": "claude-opus-4-5",
            "predicted_confidence": 0.9,
            "actual_correctness": 1 or 0
          },
          ...
        ]
        """
        from sklearn.linear_model import LogisticRegression

        for model in self.calibration_params.keys():
            # Filter validation set for this model
            model_data = [v for v in validation_set if v['model'] == model]

            if len(model_data) < 10:
                continue  # Need at least 10 samples

            # Prepare data
            X = np.array([
                np.log(v['predicted_confidence'] / (1 - v['predicted_confidence']))
                for v in model_data
            ]).reshape(-1, 1)

            y = np.array([v['actual_correctness'] for v in model_data])

            # Fit Platt scaling (logistic regression on logits)
            lr = LogisticRegression()
            lr.fit(X, y)

            # Extract parameters
            self.calibration_params[model] = {
                "a": float(lr.coef_[0][0]),
                "b": float(lr.intercept_[0])
            }

        print("Calibration params updated:", self.calibration_params)

# Usage in multi-agent debate
calibrator = ConfMADCalibrator()

def run_multi_agent_debate_with_confmad(user_request: str) -> dict:
    """
    Run LangGraph multi-agent with ConfMAD calibration
    """

    # Run debate (from section 1.3)
    debate_result = langgraph_workflow.invoke({
        "user_request": user_request
    })

    # Extract confidences from each agent
    agent_confidences = [
        {"agent": "Analyst", "model": "gemini-2.0-flash", "confidence": 0.85},
        {"agent": "Strategist", "model": "claude-sonnet-4-5", "confidence": 0.75},
        {"agent": "Critic", "model": "claude-opus-4-5", "confidence": 0.65},
    ]

    # Calibrate and aggregate
    confmad_result = calibrator.aggregate_agent_confidences(agent_confidences)

    # Final decision
    return {
        "recommendation": debate_result['arbiter_decision'],
        "confidence": confmad_result['consensus_confidence'],
        "should_escalate": confmad_result['consensus_confidence'] < 0.6,
        "confmad_analysis": confmad_result
    }
```

**Week 4 Deliverable**: ConfMAD calibrator + validation set collection + multi-agent integration + confidence dashboard

---

## TODO 3: WORKFLOWS & LEARNING (WEEK 5-6)

### 3.1 WORKFLOW AGENTS IMPLEMENTATION

**Research Basis**: Research shows -70% penalty when using multi-agent for sequential tool-heavy tasks → Use single-agent

#### 5 Core Workflow Agents

```
1. EMAIL AGENT
   ├─ Tools: Gmail API (read, send, draft, search)
   ├─ Capabilities:
   │  ├─ Smart inbox summarization
   │  ├─ Draft responses (formal Persian register)
   │  ├─ Priority detection (VIP senders, urgent keywords)
   │  └─ Auto-categorization (invoices, meetings, FYI)
   ├─ Model: Gemini Flash 80%, Claude Sonnet 20%
   └─ Research: Single-agent avoids coordination overhead

2. MEETING AGENT
   ├─ Tools: Google Calendar API, Zoom API, Transcription
   ├─ Capabilities:
   │  ├─ Smart scheduling (detect conflicts, suggest times)
   │  ├─ Zoom link generation
   │  ├─ Meeting transcription & summary
   │  └─ Action item extraction
   ├─ Model: Gemini Flash (multimodal for transcription)
   └─ Persian: Jalali calendar integration

3. DOCUMENT AGENT
   ├─ Tools: Google Docs API, Word API, PDF generation
   ├─ Capabilities:
   │  ├─ Document generation from templates
   │  ├─ Contract drafting (Persian legal language)
   │  ├─ Invoice creation (Jalali dates)
   │  └─ Report summarization
   ├─ Model: Claude Sonnet (better long-form writing)
   └─ Persian: RTL formatting, formal register

4. CALENDAR AGENT
   ├─ Tools: Google Calendar API
   ├─ Capabilities:
   │  ├─ Event creation with Jalali dates
   │  ├─ Conflict resolution
   │  ├─ Reminder management
   │  └─ Time zone conversion (Tehran timezone)
   ├─ Model: Gemini Flash (simple logic)
   └─ Persian: Holiday awareness (Nowruz, etc.)

5. FINANCIAL AGENT
   ├─ Tools: Spreadsheet APIs, Banking APIs, Invoice parsing
   ├─ Capabilities:
   │  ├─ Expense tracking
   │  ├─ Invoice processing (OCR + parsing)
   │  ├─ Budget monitoring
   │  └─ Financial reporting (quarterly, Jalali fiscal year)
   ├─ Model: Claude Opus (critical financial decisions)
   └─ Persian: Rial currency, Iranian tax rules
```

#### How to Implement (Example: Email Agent)

**Step 1: Define Email Agent with Swarm**
```python
from swarm import Agent

email_agent = Agent(
    name="Email Agent",
    model="gemini-2.0-flash",
    instructions="""
    You are the Email Agent for a Persian business AI system.

    Your responsibilities:
    1. Read and summarize emails
    2. Draft responses in formal Persian
    3. Detect priority emails (VIP senders, urgent keywords)
    4. Categorize emails (invoices, meetings, FYI)

    IMPORTANT:
    - Always use formal Persian register (شما, not تو)
    - Include Jalali date context
    - Detect Persian business idioms

    Available tools:
    - read_gmail: Fetch emails from inbox
    - send_email: Send email
    - draft_reply: Generate draft response
    - search_emails: Search inbox
    """,
    functions=[read_gmail, send_email, draft_reply, search_emails]
)

def read_gmail(max_results: int = 10, query: str = None):
    """
    Tool: Read emails from Gmail
    """
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build

    creds = load_gmail_credentials()
    service = build('gmail', 'v1', credentials=creds)

    # Fetch messages
    results = service.users().messages().list(
        userId='me',
        maxResults=max_results,
        q=query
    ).execute()

    messages = results.get('messages', [])

    # Get full message details
    emails = []
    for msg in messages:
        message = service.users().messages().get(userId='me', id=msg['id']).execute()
        emails.append({
            "id": msg['id'],
            "from": extract_header(message, 'From'),
            "subject": extract_header(message, 'Subject'),
            "snippet": message.get('snippet', ''),
            "date": extract_header(message, 'Date')
        })

    return emails

def draft_reply(email_id: str, tone: str = "formal"):
    """
    Tool: Generate draft reply to email
    """
    # Get original email
    original = get_email_by_id(email_id)

    # Generate reply with LLM
    prompt = f"""
    Draft a reply to this email in Persian ({tone} register):

    From: {original['from']}
    Subject: {original['subject']}
    Body: {original['body']}

    Context:
    - Today: {get_persian_context()['current_date_jalali']}
    - Use formal register (شما)
    - Be professional and concise
    """

    response = gemini_client.generate_content(prompt)

    return {
        "draft": response.text,
        "original_email_id": email_id
    }

def send_email(to: str, subject: str, body: str):
    """
    Tool: Send email via Gmail
    """
    from email.mime.text import MIMEText
    import base64

    creds = load_gmail_credentials()
    service = build('gmail', 'v1', credentials=creds)

    message = MIMEText(body)
    message['to'] = to
    message['subject'] = subject

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()

    sent = service.users().messages().send(
        userId='me',
        body={'raw': raw}
    ).execute()

    return f"Email sent: {sent['id']}"

def search_emails(query: str, max_results: int = 20):
    """
    Tool: Search emails in Gmail
    """
    return read_gmail(max_results=max_results, query=query)
```

**Step 2: Implement Other Agents (Similar Pattern)**
```python
# Meeting Agent
meeting_agent = Agent(
    name="Meeting Agent",
    model="gemini-2.0-flash",
    instructions="Handle meeting scheduling, Zoom links, transcription...",
    functions=[create_calendar_event, generate_zoom_link, transcribe_meeting]
)

# Document Agent
document_agent = Agent(
    name="Document Agent",
    model="claude-sonnet-4-5",  # Better writing
    instructions="Generate documents, contracts, reports in Persian...",
    functions=[create_google_doc, generate_pdf, draft_contract]
)

# Calendar Agent
calendar_agent = Agent(
    name="Calendar Agent",
    model="gemini-2.0-flash",
    instructions="Manage calendar with Jalali dates, holiday awareness...",
    functions=[create_event, find_free_slots, check_conflicts]
)

# Financial Agent
financial_agent = Agent(
    name="Financial Agent",
    model="claude-opus-4-5",  # Critical decisions
    instructions="Track expenses, process invoices, financial reporting...",
    functions=[parse_invoice, track_expense, generate_report]
)
```

**Step 3: Workflow Routing**
```python
def route_workflow_task(user_request: str):
    """
    Route to appropriate workflow agent
    """

    # Classify workflow type
    classification = classify_workflow(user_request)

    workflow_agents = {
        "email": email_agent,
        "meeting": meeting_agent,
        "document": document_agent,
        "calendar": calendar_agent,
        "financial": financial_agent
    }

    agent = workflow_agents[classification['type']]

    # Run with Swarm
    from swarm import Swarm
    client = Swarm()

    response = client.run(
        agent=agent,
        messages=[{"role": "user", "content": user_request}]
    )

    return response.messages[-1]['content']

def classify_workflow(user_request: str) -> dict:
    """
    Classify workflow type using Gemini (FREE)
    """
    prompt = f"""
    Classify this task:
    "{user_request}"

    Categories: email, meeting, document, calendar, financial

    Output JSON: {{"type": "...", "confidence": 0-1}}
    """

    response = gemini_client.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )

    return json.loads(response.text)
```

**Week 5 Deliverable**: 5 workflow agents fully functional + Gmail/Calendar/Docs integrations + test 100 workflow tasks

---

### 3.2 GEMINI DEEP RESEARCH INTEGRATION

**Research Basis**: Gemini 2.0 Deep Research Agent (Dec 11, 2025) - Multimodal research with iterative search

```python
def gemini_deep_research(query: str, depth: str = "medium") -> dict:
    """
    Use Gemini 2.0 Deep Research for comprehensive analysis

    Depth levels:
    - quick: 5-10 sources, 2 minutes
    - medium: 20-30 sources, 5 minutes
    - deep: 50+ sources, 10 minutes
    """

    prompt = f"""
    Research Query: {query}
    Depth: {depth}
    Language: Persian

    Instructions:
    1. Search multiple sources (web, papers, news)
    2. Synthesize findings
    3. Provide citations
    4. Output in structured format

    Focus on Persian market context when relevant.
    """

    # Use Gemini 2.0 with extended thinking time
    response = gemini_client.generate_content(
        prompt,
        generation_config={
            "temperature": 0.3,
            "max_output_tokens": 8192,
            "thinking_budget": 10000  # Allow deep reasoning
        }
    )

    return {
        "query": query,
        "findings": response.text,
        "sources": extract_citations(response.text),
        "depth": depth
    }

# Usage in multi-agent system
def research_task_handler(user_request: str):
    """
    Route research tasks to Gemini Deep Research
    """
    research_result = gemini_deep_research(
        query=user_request,
        depth="deep"
    )

    # Store in Archival Memory for future reference
    store_in_archival(
        user_id=current_user_id,
        content=research_result['findings'],
        metadata={
            "type": "research",
            "query": user_request,
            "sources": research_result['sources']
        }
    )

    return research_result['findings']
```

**Week 5 Deliverable**: Gemini Deep Research integration + test with 20 Persian market research queries

---

### 3.3 MCP (MODEL CONTEXT PROTOCOL) INTEGRATION

**Research Basis**: Agentic AI Foundation (Dec 9, 2025) - MCP for tool standardization, AGENTS.md for discovery

#### MCP Server Setup

```python
# Install MCP SDK
# pip install mcp-server

from mcp import MCPServer, Tool

# Create MCP server for AI-EOS tools
mcp_server = MCPServer(name="AI-EOS Tools")

# Register tools
@mcp_server.tool(
    name="read_gmail",
    description="Read emails from Gmail inbox",
    parameters={
        "max_results": {"type": "integer", "default": 10},
        "query": {"type": "string", "optional": True}
    }
)
def mcp_read_gmail(max_results: int = 10, query: str = None):
    return read_gmail(max_results, query)

@mcp_server.tool(
    name="create_calendar_event",
    description="Create event on Google Calendar with Jalali date support",
    parameters={
        "title": {"type": "string"},
        "date": {"type": "string", "description": "Jalali or Gregorian date"},
        "time": {"type": "string"}
    }
)
def mcp_create_calendar_event(title: str, date: str, time: str):
    return create_calendar_event(title, date, time)

# Register all 50+ tools...

# Start MCP server
if __name__ == "__main__":
    mcp_server.run(port=8080)
```

#### AGENTS.md Manifest

```markdown
# AI-EOS Agent Manifest

## Agent Name
Persian AI Operating System (AI-EOS)

## Description
Comprehensive AI system for Persian businesses combining multi-agent strategic advisory with workflow automation.

## Capabilities
- Strategic decision support (hiring, investment, pivots)
- Email management (Gmail integration)
- Meeting scheduling (Google Calendar, Zoom)
- Document generation (contracts, reports, invoices)
- Financial tracking (expenses, budgets)
- Deep research (Gemini 2.0 multimodal)

## MCP Tools Endpoint
http://localhost:8080/mcp

## Authentication
API Key required

## Language
Persian (Farsi) primary, English supported

## Specializations
- Persian cultural context (Jalali calendar, holidays)
- Iranian business regulations
- Formal Persian register
```

**Week 6 Deliverable**: MCP server running + AGENTS.md published + 50+ tools registered + test with external agent discovery

---

## TODO 4: UI & LAUNCH (WEEK 7-10)

### 4.1 AG-UI PROTOCOL (COPILOTKIT) INTEGRATION

**Research Basis**: CopilotKit AG-UI Protocol - Agent-UI streaming, React components

```bash
npm install @copilotkit/react-core @copilotkit/react-ui
```

```typescript
// AI-EOS Frontend with CopilotKit
import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";

function AiEosApp() {
  // Define agent actions
  useCopilotAction({
    name: "sendEmail",
    description: "Send email via AI-EOS Email Agent",
    parameters: [
      { name: "to", type: "string" },
      { name: "subject", type: "string" },
      { name: "body", type: "string" }
    ],
    handler: async ({ to, subject, body }) => {
      const response = await fetch("/api/workflow/email", {
        method: "POST",
        body: JSON.stringify({ to, subject, body })
      });
      return await response.json();
    }
  });

  useCopilotAction({
    name: "runStrategicDebate",
    description: "Run multi-agent strategic debate",
    parameters: [
      { name: "decision", type: "string" }
    ],
    handler: async ({ decision }) => {
      const response = await fetch("/api/strategic/debate", {
        method: "POST",
        body: JSON.stringify({ decision })
      });
      return await response.json();
    }
  });

  return (
    <CopilotKit url="/api/copilot">
      <div dir="rtl" lang="fa">
        <CopilotChat
          instructions="You are AI-EOS, Persian business AI assistant. Use formal register (شما)."
          labels={{
            title: "دستیار هوش مصنوعی",
            initial: "چطور می‌تونم کمکتون کنم؟"
          }}
        />
      </div>
    </CopilotKit>
  );
}
```

**Week 7 Deliverable**: CopilotKit UI deployed + RTL Persian interface + streaming responses + test with 50 users

---

### 4.2 VOICE & COMMUNICATION INTEGRATION

```
VOICE CHANNELS:
├─ WhatsApp Business API (Most popular in Iran)
├─ Telegram Bot API (Second most popular)
└─ Phone (Twilio with Persian speech recognition)

IMPLEMENTATION:
1. WhatsApp: Meta Business API
   - Receive messages via webhook
   - Process with AI-EOS
   - Send responses (text, voice, images)

2. Telegram: Bot API
   - /start command → onboarding
   - Voice message → transcribe → process
   - Inline keyboards for quick actions

3. Phone: Twilio + Persian TTS/STT
   - Inbound calls → Twilio webhook
   - Transcribe Persian (Google Speech-to-Text)
   - Process with AI-EOS
   - Respond with Persian TTS
```

**Week 8 Deliverable**: WhatsApp + Telegram bots live + Phone integration + test with 100 voice queries

---

### 4.3 BUSINESS MODEL & PRICING

```
TIERED PRICING:

1. STARTER: $150/month
   - 500 queries/month
   - Email + Calendar agents
   - Basic memory (30 days)
   - No multi-agent debate

2. PROFESSIONAL: $500/month
   - 2000 queries/month
   - All 5 workflow agents
   - Full memory (90 days)
   - Multi-agent strategic advisory (10 debates/month)
   - Persian deep research

3. ENTERPRISE: $2000/month
   - Unlimited queries
   - All features
   - Unlimited multi-agent debates
   - Custom integrations
   - Dedicated support
   - On-premise deployment option

REVENUE PROJECTIONS:
- Week 2: $5K-10K MRR (10-20 Starter customers)
- Month 3: $40K MRR (20 Professional, 5 Enterprise)
- Year 1: $1.5M ARR
- Year 5: $50M+ ARR (2000 Enterprise customers)

COST STRUCTURE:
- LLM costs: $100/month per 1000 queries (Gemini FREE + Claude)
- Infrastructure: $50/user/month (AWS, databases)
- Gross margin: 60-70%
```

**Week 9 Deliverable**: Stripe integration (or crypto for sanctions) + pricing tiers + billing dashboard

---

### 4.4 PRODUCTION DEPLOYMENT

```
INFRASTRUCTURE:

1. COMPUTE:
   ├─ AWS/GCP (US/EU for Gemini/Claude access)
   ├─ Cloudflare Workers (Edge functions for low latency)
   └─ Option: UAE/Turkey hosting (closer to Iran)

2. DATABASE:
   ├─ PostgreSQL (RDS or managed)
   ├─ pgvector extension (for embeddings)
   ├─ Redis (caching, rate limiting)
   └─ S3/R2 (artifact storage)

3. MONITORING:
   ├─ Sentry (error tracking)
   ├─ DataDog (performance monitoring)
   ├─ Custom dashboard (cost per query, latency, success rate)
   └─ Agent Lightning metrics (reward trends, policy updates)

4. SECURITY:
   ├─ API key authentication
   ├─ Rate limiting (per tier)
   ├─ Data encryption at rest & in transit
   ├─ GDPR compliance (for EU customers)
   └─ Persian legal compliance

5. CI/CD:
   ├─ GitHub Actions
   ├─ Automated tests (unit, integration, end-to-end)
   ├─ Blue-green deployment
   └─ Rollback capability
```

**Week 10 Deliverable**: Full production deployment + monitoring + security audit + load testing (1000 concurrent users)

---

## WEEK 1 DETAILED BREAKDOWN (For Immediate Start)

### Day 1-2: Context Engineering Foundation
- [ ] Set up PostgreSQL with JSONB for session events
- [ ] Implement 4-layer context architecture (Working, Session, Memory, Artifacts)
- [ ] Build context compiler function
- [ ] Test with 100-message conversation
- [ ] Add Persian cultural context injection (Jalali calendar)

### Day 3-4: LLM Routing & Cost Optimization
- [ ] Integrate Gemini 2.0 Flash API (FREE tier)
- [ ] Integrate Claude Sonnet 4.5 & Opus 4.5 APIs
- [ ] Build complexity classifier (route 80/5/15 distribution)
- [ ] Implement fallback chain (Gemini → Claude escalation)
- [ ] Add cost tracking dashboard
- [ ] Test with 100 diverse requests

### Day 5-6: LangGraph Multi-Agent Setup
- [ ] Install LangGraph 1.0.5
- [ ] Define DebateState schema
- [ ] Implement 4 agents (Analyst, Strategist, Critic, Arbiter)
- [ ] Set up agent graph with conditional edges
- [ ] Test multi-agent debate with 10 strategic decisions

### Day 7: OpenAI Swarm Workflow Agents
- [ ] Install OpenAI Swarm
- [ ] Define Email Agent with Gmail tools
- [ ] Define Meeting Agent with Calendar tools
- [ ] Implement task router (Strategic → LangGraph, Workflow → Swarm)
- [ ] Test with 20 workflow tasks

---

## WEEK 2 DETAILED BREAKDOWN

### Day 8-9: Persian Optimization
- [ ] Jalali calendar integration (persiantools)
- [ ] Formal/informal register detection
- [ ] Translation pipeline for Gemini (Persian ↔ English)
- [ ] RTL UI components
- [ ] Test with 50 Persian queries

### Day 10-11: Database & Session Management
- [ ] Complete PostgreSQL schema (all tables)
- [ ] Set up pgvector for semantic search
- [ ] Implement session lifecycle (create, append, archive)
- [ ] Seed test data (10 users, 100 sessions)
- [ ] Set up automated backups

### Day 12-14: Integration Testing
- [ ] End-to-end test: User query → Context compilation → LLM routing → Multi-agent debate → Response
- [ ] Test Persian cultural context in all responses
- [ ] Measure latency (target: <3 seconds for simple, <10 seconds for multi-agent)
- [ ] Measure cost (target: $0.10 per query)
- [ ] Document all APIs and schemas

---

## SUCCESS METRICS

### Technical Metrics
- **Latency**: <3s simple queries, <10s multi-agent debates
- **Cost**: <$100/month per 1000 queries
- **Accuracy**: >80% user satisfaction (thumbs up/down)
- **Uptime**: 99.9% SLA
- **Memory Recall**: >70% on LoCoMo benchmark

### Business Metrics
- **Week 2**: First paying customer ($150 MRR)
- **Month 1**: 20 customers ($5K MRR)
- **Month 3**: 100 customers ($40K MRR)
- **Month 6**: 300 customers ($150K MRR)
- **Year 1**: 1000 customers ($1.5M ARR)

### Research Validation
- **Multi-Agent**: Measure improvement vs single-agent baseline (target: +50% for strategic)
- **ConfMAD**: Calibrate confidence scores (target: <10% error)
- **Agent Lightning**: RL improvement over time (target: +20% reward after 1000 episodes)

---

## RISK MITIGATION

### Technical Risks
1. **Gemini Persian Quality**: Mitigation → Translation pipeline + Claude for language-critical
2. **Multi-Agent Cost**: Mitigation → Conditional routing, only for high-stakes
3. **Latency**: Mitigation → Caching, Gemini Flash default, async processing

### Business Risks
1. **Sanctions**: Mitigation → Crypto payments (USDT), UAE/Turkey hosting
2. **Competition**: Mitigation → Persian monopoly, institutional memory moat
3. **Adoption**: Mitigation → Free trial, WhatsApp/Telegram for low friction

### Regulatory Risks
1. **Data Privacy**: Mitigation → GDPR compliance, Iranian legal review
2. **Payment Processing**: Mitigation → ZarinPal (Iranian), crypto alternative
3. **Hosting**: Mitigation → Multi-region (US for APIs, UAE for users)

---

## COMPETITIVE MOATS (Why We Win)

1. **Persian Monopoly**: Zero competition in comprehensive Persian AI
2. **Research-Validated**: Multi-agent where proven, single-agent otherwise
3. **Memory Moat**: Letta + Agent Lightning = institutional memory competitors can't copy
4. **Latest Tech**: Gemini 2.0 FREE (Dec 11), Agent Lightning (Dec 10), MCP (Dec 9)
5. **Context Engineering**: Google ADK pattern (3x faster, 5x cheaper)
6. **Ship-to-Learn**: Revenue from Week 2, learn in production
7. **Hybrid Orchestration**: Right tool for each task (LangGraph vs Swarm)

---

## APPENDIX: TECHNOLOGY STACK SUMMARY

### LLMs
- **Gemini 2.0 Flash**: 80% of queries, FREE tier (1,500/day)
- **Claude Sonnet 4.5**: 5% of queries, $3/$15 per MTok
- **Claude Opus 4.5**: 15% of queries, $15/$75 per MTok

### Orchestration
- **LangGraph 1.0.5**: Multi-agent strategic debates
- **OpenAI Swarm**: Single-agent workflow handoffs
- **Google ADK**: 4-layer context architecture

### Memory
- **Letta 0.3.0**: 3-tier memory system (Core 2KB, Session 90d, Archival ∞)
- **pgvector**: Semantic search for archival
- **PostgreSQL**: Session events, JSONB storage

### Learning
- **Agent Lightning**: RL training (TAD + AIR)
- **ConfMAD**: Confidence calibration (Platt scaling)

### Protocols
- **MCP**: Model Context Protocol (tool standardization)
- **AG-UI**: Agent-UI streaming (CopilotKit)
- **AGENTS.md**: Discovery manifest

### Infrastructure
- **Backend**: Python 3.11, FastAPI
- **Frontend**: React, TypeScript, CopilotKit
- **Database**: PostgreSQL + pgvector + Redis
- **Hosting**: AWS/GCP (APIs) + Cloudflare (edge)
- **Voice**: Twilio, WhatsApp Business API, Telegram Bot API

### Persian Optimization
- **Calendar**: persiantools (Jalali ↔ Gregorian)
- **Translation**: Google Translate API (Persian ↔ English)
- **Speech**: Google Speech-to-Text (Persian), Google TTS

---

## NEXT STEPS AFTER WEEK 10

1. **Iterate Based on User Feedback**: Ship-to-learn paradigm
2. **Add More Workflow Agents**: HR, CRM, Inventory, etc.
3. **Enterprise Features**: SSO, audit logs, custom models
4. **Geographic Expansion**: Arabic, Turkish, Urdu markets
5. **API Marketplace**: Let developers build on AI-EOS platform

---

## CONCLUSION

This plan synthesizes:
- 7 comprehensive research documents
- Latest December 2025 breakthroughs (Gemini 2.0, Agent Lightning, MCP)
- Research-validated architecture (multi-agent +50-80%, single-agent workflows)
- Persian-first design (cultural, linguistic, regulatory)
- Production patterns (Google ADK, Anthropic lessons, LangChain discipline)

**The result**: A 10-week path to a Persian AI Operating System with 7 unfair advantages and $1.5M ARR Year 1 potential.

**Execution principle**: Ship to learn. Revenue from Week 2. Iterate in production.

---

**End of Ultimate AI-EOS Plan**
