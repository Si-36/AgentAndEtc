# AI-EOS: Persian Enterprise AI Operating System

**Version**: Week 1-2 Foundation
**Status**: Active Development
**Build Timeline**: 10 Weeks

## Overview

AI-EOS is a comprehensive Persian-first AI operating system for businesses, combining research-validated multi-agent strategic advisory with intelligent workflow automation.

### 7 Unfair Advantages

1. **Persian Monopoly**: First comprehensive Persian AI system (23M speakers, zero competition)
2. **Research-Validated Architecture**: Multi-agent where proven (+50-80%), single-agent otherwise
3. **Memory Moat**: Letta 3-tier system + Agent Lightning RL
4. **Latest Tech Stack**: Gemini 2.0 FREE (Dec 11, 2025), Agent Lightning (Dec 10), MCP (Dec 9)
5. **Context Engineering**: Google ADK 4-layer pattern (3x faster, 5x cheaper)
6. **Ship-to-Learn Discipline**: Revenue from Week 2, learn in production
7. **Hybrid Orchestration**: Right tool for each task (LangGraph vs Swarm)

## Architecture

### 6-Layer System

```
1. ORCHESTRATION & ROUTING
   ├─ Google ADK Context Engineering (4-layer)
   ├─ LangGraph 1.0.5 Multi-Agent Orchestration
   └─ OpenAI Swarm Simple Handoffs

2. INTELLIGENCE LAYER
   ├─ Gemini 2.0 Flash (80%, FREE tier)
   ├─ Claude Opus 4.5 (15%, strategic decisions)
   └─ Claude Sonnet 4.5 (5%, analysis)

3. STRATEGIC MULTI-AGENT (Centralized Debate)
   ├─ Analyst Agent (Gemini)
   ├─ Strategist Agent (Claude Sonnet)
   ├─ Critic Agent (Claude Opus)
   └─ Arbiter Agent (Claude Opus + ConfMAD)

4. MEMORY & LEARNING
   ├─ Letta 3-Tier Memory (Core 2KB, Session 90d, Archival ∞)
   ├─ Agent Lightning RL (TAD + AIR)
   └─ Self-Editing Memory (74% LoCoMo benchmark)

5. WORKFLOW AGENTS (Single-Agent)
   ├─ Email Agent (Gmail integration)
   ├─ Meeting Agent (Calendar + Zoom)
   ├─ Document Agent (Docs + PDF)
   ├─ Calendar Agent (Jalali support)
   └─ Financial Agent (Expense tracking)

6. FOUNDATION & PROTOCOLS
   ├─ MCP (Model Context Protocol)
   ├─ AG-UI Protocol (CopilotKit)
   └─ Voice (WhatsApp, Telegram, Phone)
```

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 14+ with pgvector extension
- Redis (optional, for caching)
- API Keys:
  - Google Gemini API
  - Anthropic API
  - OpenAI API (for embeddings)

### Installation

1. **Clone and setup**:
```bash
git clone <repository>
cd group_agent
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Configure environment**:
```bash
cp config/.env.example .env
# Edit .env with your API keys and database credentials
```

3. **Setup database**:
```bash
# Create PostgreSQL database
createdb ai_eos

# Enable pgvector extension
psql ai_eos -c "CREATE EXTENSION vector;"

# Run migrations
python -c "from src.database import db; db.execute_migration('database/migrations/001_initial_schema.sql')"
```

4. **Run demo**:
```bash
python examples/demo_context_and_routing.py
```

Expected output:
- ✓ Context compilation from 4 layers
- ✓ Persian cultural context injection
- ✓ Complexity-based routing (Gemini for simple, Claude for strategic)
- ✓ Core Memory editing demonstration
- ✓ Cost tracking and analytics

## Project Structure

```
group_agent/
├── src/
│   ├── agents/          # Multi-agent debate logic (Week 5-6)
│   ├── context/         # 4-layer context compiler
│   │   └── compiler.py  # ✓ COMPLETE
│   ├── memory/          # Letta integration (Week 3-4)
│   ├── workflow/        # Single-agent workflows (Week 5-6)
│   ├── api/             # FastAPI endpoints (Week 7-8)
│   ├── config.py        # ✓ COMPLETE
│   ├── database.py      # ✓ COMPLETE
│   └── llm/
│       └── clients.py   # ✓ COMPLETE
├── database/
│   └── migrations/
│       └── 001_initial_schema.sql  # ✓ COMPLETE
├── config/
│   └── .env.example     # ✓ COMPLETE
├── tests/               # Pytest tests
├── examples/
│   └── demo_context_and_routing.py  # ✓ COMPLETE
├── requirements.txt     # ✓ COMPLETE
├── ultimate_last_plan.md  # ✓ COMPLETE (Master Plan)
└── README.md            # ✓ COMPLETE
```

## Week 1-2 Status (CURRENT)

### Completed ✓

- [x] PostgreSQL schema with 4-layer context architecture
- [x] Context compiler (Working, Session, Memory, Artifacts)
- [x] Persian cultural context injection (Jalali calendar, holidays)
- [x] LLM client integrations (Gemini 2.0 Flash, Claude Sonnet/Opus)
- [x] Complexity-based routing (80/5/15 distribution)
- [x] Cost tracking system
- [x] Core Memory editing
- [x] Demonstration script

### In Progress 🚧

- [ ] LangGraph multi-agent setup (Day 5-6)
- [ ] OpenAI Swarm workflow agents (Day 7)
- [ ] Task router (Strategic vs Workflow)

### Next Steps

1. **Day 5-6**: Implement 4 debate agents (Analyst, Strategist, Critic, Arbiter)
2. **Day 7**: Workflow agents (Email, Meeting, Document, Calendar, Financial)
3. **Week 2**: Persian optimization, database tuning, integration testing

## Cost Structure

### Target Distribution
- **Gemini 2.0 Flash**: 80% of requests (FREE tier: 1,500/day)
- **Claude Sonnet 4.5**: 5% of requests ($3/$15 per MTok)
- **Claude Opus 4.5**: 15% of requests ($15/$75 per MTok)

### Projected Costs
- **$100/month** for 1000 queries (vs $200 Claude Teams, $300 ChatGPT Teams)
- **60-70% gross margin** at scale

## Research Basis

### Multi-Agent Performance
- **+50-80%** improvement for strategic decisions (research-validated)
- **4.4x error rate** (best option) vs 17.2x independent agents
- **-70% penalty** when using multi-agent for sequential workflows → Use single-agent

### Context Engineering
- **Google ADK Pattern**: 3x faster, 5x cheaper than naive RAG
- **4-layer separation**: Working (ephemeral) → Session (log) → Memory (semantic) → Artifacts (lazy)

### Memory System
- **Letta**: 74% LoCoMo benchmark, self-editing agents
- **Agent Lightning**: RL training without code rewrites (TAD + AIR)

## Persian Optimization

### Cultural
- Jalali calendar integration (1404 fiscal year)
- Persian holidays (Nowruz, Yalda, Sizdah Bedar)
- Formal/informal register detection (شما vs تو)

### Linguistic
- RTL formatting
- Persian idioms and business expressions
- Translation pipeline for Gemini (Persian ↔ English)

### Regulatory
- Sanctions compliance (crypto payments, UAE/Turkey hosting)
- Iranian legal framework
- GDPR-equivalent for Persian customers

## Development Timeline

### Week 1-2: Foundation ✓ (Current)
- Context engineering
- LLM routing
- Database schema

### Week 3-4: Intelligence & Memory
- Letta 3-tier memory
- Agent Lightning RL
- ConfMAD calibration

### Week 5-6: Workflows & Learning
- 5 workflow agents
- Gemini Deep Research
- MCP integration

### Week 7-10: UI & Launch
- CopilotKit AG-UI
- WhatsApp/Telegram bots
- Production deployment

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src tests/

# Run specific test
pytest tests/test_context_compiler.py
```

## Contributing

This is a private project. See MASTER_PLAN.md and ultimate_last_plan.md for complete implementation details.

## License

Proprietary - All rights reserved

## Support

For questions or issues, contact the development team.

---

**Built with**: Gemini 2.0 Flash, Claude Opus 4.5, LangGraph, Letta, PostgreSQL, FastAPI
**Research**: Google ADK, Anthropic Production Patterns, Agent Lightning, ConfMAD
**Target**: Persian SMEs & Enterprise (23M speakers)
