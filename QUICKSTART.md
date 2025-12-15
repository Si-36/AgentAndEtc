# AI-EOS Quick Start Guide

## 🎯 What You Have

A complete multi-agent AI system with:
- ✅ Intelligent router (7 task types)
- ✅ Multi-agent debate system (4 agents)
- ✅ 5 workflow agents (Email, Calendar, Document, Financial, Meeting)
- ✅ Persian context integration
- ✅ LangGraph orchestration

## 🚀 Get Started in 3 Steps

### Step 1: Activate Environment
```bash
cd /home/sina/projects/group_agent
source venv/bin/activate
```

### Step 2: Add API Keys
Edit `.env` file and add your keys:

```bash
# Required for full functionality
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
GEMINI_API_KEY=YOUR_KEY_HERE

# Optional (for debugging)
LANGCHAIN_TRACING_V2=false  # Set to true if you have LangSmith key
LANGCHAIN_API_KEY=lsv2_pt_YOUR_KEY_HERE
```

**Get API Keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/settings/keys
- Gemini: https://ai.google.dev/
- LangSmith: https://smith.langchain.com/

### Step 3: Test the System

#### Test 1: Structure Test (No API Keys Needed)
```bash
python test_debate_simple.py
```
Expected output: ✅ All structural tests passed!

#### Test 2: Router (Requires OpenAI Key)
```bash
python src/agents/router.py
```
Expected output: Classification table with 7 test queries

#### Test 3: Debate System (Requires All Keys)
```bash
python src/agents/debate_system.py
```
Expected output: Full debate with 4 agents, consensus, final decision

#### Test 4: Workflow Agents (Requires OpenAI Key)
```bash
python src/agents/workflow_agents.py
```
Expected output: 5 agents tested with tool calls

#### Test 5: Full Integration (Requires All Keys)
```bash
# Interactive mode
python src/main.py

# Or direct query
python src/main.py "Should we expand to Dubai market?"
```

## 📊 Example Queries

### Strategic (Routes to Debate System)
```bash
python src/main.py "Should we expand our software company to Dubai market in 2025?"
python src/main.py "Evaluate the acquisition of Company X for $2M"
python src/main.py "Should we pivot to B2B or stay B2C?"
```

### Email (Routes to Email Agent)
```bash
python src/main.py "Draft a response to client@example.com thanking them"
python src/main.py "Summarize emails from last week"
python src/main.py "Search for emails about the project proposal"
```

### Calendar (Routes to Calendar Agent)
```bash
python src/main.py "Schedule a meeting with the team next Tuesday at 2pm"
python src/main.py "Find free time slots next week for a 1-hour meeting"
python src/main.py "What meetings do I have tomorrow?"
```

### Document (Routes to Document Agent)
```bash
python src/main.py "Create a proposal document for the new project"
python src/main.py "Update the Q4 report with latest numbers"
python src/main.py "Search for documents about marketing strategy"
```

### Financial (Routes to Financial Agent)
```bash
python src/main.py "Track an expense of 5000000 Rial for marketing"
python src/main.py "Generate an invoice for Client X"
python src/main.py "Show me budget summary for this month"
```

### Meeting (Routes to Meeting Agent)
```bash
python src/main.py "Transcribe the meeting recording from yesterday"
python src/main.py "Extract action items from: Ali will follow up by Friday"
python src/main.py "Summarize the team meeting"
```

### Simple (Routes to Simple LLM)
```bash
python src/main.py "What is the Jalali date today?"
python src/main.py "Convert 1000 USD to Rial"
python src/main.py "What day of the week is it?"
```

## 🐛 Troubleshooting

### Error: "No module named 'agents'"
```bash
# Make sure you're in the right directory
cd /home/sina/projects/group_agent
source venv/bin/activate
```

### Error: "Invalid API key"
```bash
# Check your .env file
cat .env | grep API_KEY

# Make sure keys don't have quotes or extra spaces
# Correct: OPENAI_API_KEY=sk-proj-abc123
# Wrong: OPENAI_API_KEY="sk-proj-abc123"
```

### Error: "LangSmith 403 Forbidden"
```bash
# Disable LangSmith tracing in .env
LANGCHAIN_TRACING_V2=false
```

### Error: "Rate limit exceeded"
```bash
# You're hitting API rate limits
# Wait a few minutes or upgrade your API plan
```

## 📁 File Structure

```
group_agent/
├── venv/                      # Virtual environment (activated)
├── src/
│   ├── main.py               # Main orchestrator (run this!)
│   └── agents/
│       ├── debate_system.py  # Multi-agent debate
│       ├── router.py         # Query classifier
│       └── workflow_agents.py # 5 workflow agents
├── test_debate_simple.py     # Structure test
├── .env                      # API keys (edit this!)
├── QUICKSTART.md            # This file
├── SETUP.md                 # Detailed setup
├── WEEK1_COMPLETE.md        # Week 1 summary
└── README.md                # Full documentation
```

## 🎓 Understanding the System

### How It Works
1. **User Query** → Router classifies the query
2. **Router** → Routes to appropriate system:
   - Strategic → Multi-agent debate (4 agents, 2 rounds)
   - Workflow → Single-agent with tools (Email, Calendar, etc.)
   - Simple → Direct LLM response
3. **System** → Executes and returns result

### Persian Context
The system automatically:
- Converts dates to Jalali calendar
- Calculates Iranian fiscal year (starts Farvardin 1)
- Detects quarters (Q1-Q4)
- Recognizes Iranian weekends (Friday)

### Cost Estimates
- **Debate**: ~$0.10-0.30 per query (30-60s)
- **Workflow**: ~$0.01-0.05 per query (5-15s)
- **Router**: ~$0.001 per query (1-2s)
- **Simple**: ~$0.001 per query (1-2s)

## 📚 Next Steps

1. **Test with your own queries** - Try different types of questions
2. **Add real API integrations** - Connect Gmail, Calendar, Docs (Week 2)
3. **Customize prompts** - Edit agent prompts in the code
4. **Add memory** - Implement conversation history (Week 3)
5. **Deploy** - Set up on a server for production use (Week 4+)

## 🤝 Need Help?

- **Documentation**: See README.md and SETUP.md
- **Architecture**: See the Mermaid diagram (rendered above)
- **Week 1 Summary**: See WEEK1_COMPLETE.md

---

**Status**: Week 1 Complete ✅
**Ready to use**: Yes (with API keys)
**Next**: Week 2 Integration & Testing

