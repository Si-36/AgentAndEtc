# AI-EOS Persian Business Advisor - Setup Guide

## ✅ Completed (Day 1-6)

### Environment Setup
- ✅ Python 3.13 virtual environment created
- ✅ LangGraph + LangChain installed
- ✅ Persian tools (persiantools, jdatetime) installed
- ✅ Rich CLI interface installed

### Multi-Agent Debate System (Day 5-6)
- ✅ 4-agent debate system implemented (Analyst, Strategist, Critic, Arbiter)
- ✅ ConfMAD calibration for confidence aggregation
- ✅ Persian context integration (Jalali dates, fiscal year)
- ✅ LangGraph state management
- ✅ Conditional routing (2-round debate logic)

### Task Router (Day 7)
- ✅ Intelligent query classification
- ✅ Routes to: Debate System | Workflow Agents | Simple LLM
- ✅ 7 task types supported

### Workflow Agents (Day 7)
- ✅ Email Agent (Gmail integration tools)
- ✅ Calendar Agent (Google Calendar tools)
- ✅ Document Agent (Google Docs tools)
- ✅ Financial Agent (expense tracking, invoicing)
- ✅ Meeting Agent (transcription, action items)

## 🔧 Required API Keys

To run the system, you need to add API keys to `.env`:

### 1. OpenAI API Key (Required for Router + Workflow Agents)
```bash
OPENAI_API_KEY=sk-proj-...
```
Get from: https://platform.openai.com/api-keys

### 2. Anthropic API Key (Required for Debate System)
```bash
ANTHROPIC_API_KEY=sk-ant-...
```
Get from: https://console.anthropic.com/settings/keys

### 3. Google Gemini API Key (Required for Debate System)
```bash
GEMINI_API_KEY=...
```
Get from: https://ai.google.dev/

### 4. LangSmith API Key (Optional but Recommended)
```bash
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_...
```
Get from: https://smith.langchain.com/

## 🚀 Quick Start

### 1. Activate Virtual Environment
```bash
source venv/bin/activate
```

### 2. Add API Keys
Edit `.env` file and add your API keys (see above).

### 3. Test Debate System
```bash
python test_debate_simple.py  # Structure test (no API keys needed)
python src/agents/debate_system.py  # Full test (requires API keys)
```

### 4. Test Router
```bash
python src/agents/router.py  # Requires OPENAI_API_KEY
```

### 5. Test Workflow Agents
```bash
python src/agents/workflow_agents.py  # Requires OPENAI_API_KEY
```

## 📁 Project Structure

```
group_agent/
├── venv/                      # Python virtual environment
├── src/
│   └── agents/
│       ├── debate_system.py   # Multi-agent debate (Day 5-6)
│       ├── router.py          # Task classifier (Day 7)
│       └── workflow_agents.py # 5 workflow agents (Day 7)
├── test_debate_simple.py      # Structure test
├── .env                       # API keys (DO NOT COMMIT)
├── SETUP.md                   # This file
└── README.md                  # Project overview
```

## 🎯 Next Steps (Week 2+)

### Week 2: Integration & Testing
- [ ] Integrate all systems (router → debate/workflow)
- [ ] Add PyTest suite with LangSmith tracing
- [ ] Implement actual Google API integrations
- [ ] Add Persian NLP enhancements

### Week 3: Memory & Learning
- [ ] Implement 3-tier memory (working, episodic, semantic)
- [ ] Add user preference learning
- [ ] Implement conversation history

### Week 4: Advanced Features
- [ ] Add RL-based agent improvement
- [ ] Implement multi-modal support
- [ ] Add voice interface (Persian TTS/STT)

## 🐛 Troubleshooting

### Import Errors
Make sure virtual environment is activated:
```bash
source venv/bin/activate
```

### API Key Errors
Check that `.env` file has valid API keys:
```bash
cat .env | grep API_KEY
```

### LangSmith 403 Errors
Disable LangSmith tracing if you don't have an API key:
```bash
# In .env file
LANGCHAIN_TRACING_V2=false
```

## 📚 Documentation

- **LangGraph**: https://langchain-ai.github.io/langgraph/
- **LangSmith**: https://docs.smith.langchain.com/
- **OpenAI API**: https://platform.openai.com/docs
- **Anthropic API**: https://docs.anthropic.com/
- **Google Gemini**: https://ai.google.dev/docs

## 🎉 Success Criteria

You'll know the system is working when:
1. ✅ `test_debate_simple.py` passes all structural tests
2. ✅ `debate_system.py` runs a full debate (with API keys)
3. ✅ `router.py` classifies queries correctly
4. ✅ `workflow_agents.py` executes tool calls

## 💡 Tips

- Start with small tests to verify each component
- Use LangSmith for debugging complex agent interactions
- Test with Persian queries to verify context integration
- Monitor API costs (use cheaper models for testing)

---

**Status**: Week 1 Complete ✅ (Day 1-7)
**Next**: Week 2 Integration & Testing

