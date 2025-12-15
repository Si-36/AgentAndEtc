# 🚀 QUICK START - DAY 1 (Copy-Paste Ready)

**Date**: December 15, 2025  
**Goal**: Get LangSmith + Letta working in 4 hours  
**Cost**: $0 (all free tiers)

---

## ⏱️ TIMELINE (4 Hours)

- **Hour 1**: Setup environment + LangSmith (30 min)
- **Hour 2**: Install Letta + create first agent (1 hour)
- **Hour 3**: Test memory + tracing (1 hour)
- **Hour 4**: Build simple debate (1.5 hours)

---

## 🔧 HOUR 1: SETUP (30 minutes)

### Step 1: Create Project (5 min)
```bash
# Create directory
mkdir ai-eos-production
cd ai-eos-production

# Setup Python 3.11+
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Verify Python version
python --version  # Should be 3.11+
```

### Step 2: Install Dependencies (10 min)
```bash
# Core dependencies
pip install langgraph langsmith langchain-openai langchain-google-genai letta pytest

# Verify installations
python -c "import langgraph; print('✅ LangGraph installed')"
python -c "import letta; print('✅ Letta installed')"
```

### Step 3: Get API Keys (10 min)

1. **LangSmith** (FREE): https://smith.langchain.com/settings
   - Sign up with GitHub
   - Create API key
   - Copy: `lsv2_pt_...`

2. **Gemini** (FREE): https://aistudio.google.com/app/apikey
   - Sign in with Google
   - Create API key
   - Copy: `AIza...`

3. **Claude** (PAID): https://console.anthropic.com/
   - Sign up
   - Add $5 credit
   - Create API key
   - Copy: `sk-ant-...`

### Step 4: Create .env File (5 min)
```bash
cat > .env << 'EOF'
# Observability (FREE)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_YOUR_KEY_HERE
LANGCHAIN_PROJECT=ai-eos-day1

# LLMs
GOOGLE_API_KEY=YOUR_GEMINI_KEY_HERE
ANTHROPIC_API_KEY=YOUR_CLAUDE_KEY_HERE

# Optional (for later)
TAVILY_API_KEY=your_tavily_key_here
EOF

# Load environment
source .env  # On Windows: set -a; source .env; set +a
```

---

## 🧠 HOUR 2: LETTA SETUP (1 hour)

### Step 1: Start Letta Server (5 min)
```bash
# Start server in background
letta server &

# Wait 10 seconds for startup
sleep 10

# Verify server running
curl http://localhost:8283/health
# Should return: {"status":"ok"}
```

### Step 2: Create First Agent (15 min)
```python
# test_letta.py
from letta import create_client
from letta.schemas.memory import ChatMemory

# Create client
client = create_client()

# Create agent with Persian memory
agent = client.create_agent(
    name="business_advisor",
    memory=ChatMemory(
        human="کارآفرین ایرانی که می‌خواهد کسب‌وکار آنلاین راه‌اندازی کند",
        persona="من یک مشاور کسب‌وکار هستم که از حافظه یادگیری استفاده می‌کنم"
    )
)

print(f"✅ Agent created: {agent.id}")
print(f"✅ Agent name: {agent.name}")

# Test agent
response = client.send_message(
    agent_id=agent.id,
    message="سلام! من می‌خواهم یک پلتفرم آموزش حیوانات خانگی راه‌اندازی کنم. نظرت چیه؟",
    role="user"
)

print("\n📝 Agent Response:")
for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.text)
```

### Step 3: Run Test (5 min)
```bash
python test_letta.py

# Expected output:
# ✅ Agent created: agent-123...
# ✅ Agent name: business_advisor
# 📝 Agent Response:
# [Persian response about pet education platform]
```

### Step 4: Test Memory Persistence (15 min)
```python
# test_memory.py
from letta import create_client

client = create_client()

# Get existing agent
agents = client.list_agents()
agent_id = agents[0].id

# Send follow-up (tests memory)
response = client.send_message(
    agent_id=agent_id,
    message="بازار هدف من تهران است. چه تحقیقاتی باید انجام بدم؟",
    role="user"
)

print("📝 Agent remembers context:")
for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.text)

# Check memory
agent = client.get_agent(agent_id)
print("\n🧠 Core Memory:")
print(f"Human: {agent.memory.human}")
print(f"Persona: {agent.memory.persona}")
```

---

## 🔍 HOUR 3: LANGSMITH TRACING (1 hour)

### Step 1: Test Tracing (10 min)
```python
# test_tracing.py
import os
os.environ['LANGCHAIN_TRACING_V2'] = 'true'

from langchain_google_genai import ChatGoogleGenerativeAI

# Create LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-exp",
    temperature=0.7
)

# Test call (will be traced)
response = llm.invoke("What's the capital of Iran?")
print(f"✅ Response: {response.content}")
print(f"✅ Check trace: https://smith.langchain.com/")
```

### Step 2: View in LangSmith (20 min)
1. Open: https://smith.langchain.com/
2. Click on "ai-eos-day1" project
3. See your trace
4. Click on trace to see details:
   - Input: "What's the capital of Iran?"
   - Output: "Tehran"
   - Latency: ~2 seconds
   - Cost: $0.00 (Gemini FREE)

### Step 3: Test with Letta (30 min)
```python
# test_letta_tracing.py
import os
os.environ['LANGCHAIN_TRACING_V2'] = 'true'

from letta import create_client

client = create_client()
agents = client.list_agents()
agent_id = agents[0].id

# This will be traced
response = client.send_message(
    agent_id=agent_id,
    message="تحلیل SWOT برای پلتفرم آموزش حیوانات خانگی بده",
    role="user"
)

print("✅ Check LangSmith for full trace")
```

---

## 🎯 HOUR 4: SIMPLE DEBATE (1.5 hours)

### Step 1: Create Debate Agents (30 min)
```python
# simple_debate.py
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_anthropic import ChatAnthropic

# Create 3 agents
analyst = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp")
strategist = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp")
arbiter = ChatAnthropic(model="claude-3-7-sonnet-20250219")

# Test question
question = "Should I launch HiPet pet education platform in Tehran?"

# Analyst response
analyst_response = analyst.invoke(f"""
You are a data-driven analyst.

Question: {question}

Provide data-driven analysis focusing on:
- Market size
- Competition
- Financial viability

Keep it concise (3-5 points).
""")

print("📊 Analyst:")
print(analyst_response.content)
print()

# Strategist response
strategist_response = strategist.invoke(f"""
You are a strategic planner.

Question: {question}

Analyst says: {analyst_response.content}

Provide strategic recommendations focusing on:
- Launch strategy
- Risk mitigation
- Growth plan

Keep it concise (3-5 points).
""")

print("🎯 Strategist:")
print(strategist_response.content)
print()

# Arbiter final decision
arbiter_response = arbiter.invoke(f"""
You are the final decision maker.

Question: {question}

Analyst: {analyst_response.content}

Strategist: {strategist_response.content}

Synthesize their input and provide:
1. Final recommendation (YES/NO/MAYBE)
2. Confidence level (0-100%)
3. Key reasoning (3 points)
4. Next steps (3 actions)

Format as JSON.
""")

print("⚖️ Final Decision:")
print(arbiter_response.content)
```

### Step 2: Run Debate (10 min)
```bash
python simple_debate.py

# Expected: Complete debate in ~15 seconds
# Cost: ~$0.05 (mostly Claude)
```

### Step 3: Check LangSmith (10 min)
1. Open LangSmith
2. See 3 traces (analyst, strategist, arbiter)
3. Compare costs:
   - Analyst: $0.00 (Gemini FREE)
   - Strategist: $0.00 (Gemini FREE)
   - Arbiter: ~$0.05 (Claude)

---

## ✅ DAY 1 CHECKLIST

- [ ] Python 3.11+ installed
- [ ] All dependencies installed
- [ ] API keys obtained (LangSmith, Gemini, Claude)
- [ ] .env file created
- [ ] Letta server running
- [ ] First agent created
- [ ] Memory persistence tested
- [ ] LangSmith tracing working
- [ ] Simple debate working
- [ ] All traces visible in LangSmith

---

## 🎉 SUCCESS CRITERIA

If you can answer YES to all:
1. ✅ Can you see traces in LangSmith?
2. ✅ Does Letta remember previous messages?
3. ✅ Does the debate produce a final decision?
4. ✅ Is the total cost < $0.10?

**If YES to all → You're ready for Day 2!**

---

## 🚨 TROUBLESHOOTING

### Letta server won't start
```bash
# Kill existing server
pkill -f "letta server"

# Start fresh
letta server
```

### LangSmith not showing traces
```bash
# Verify environment
echo $LANGCHAIN_TRACING_V2  # Should be "true"
echo $LANGCHAIN_API_KEY     # Should start with "lsv2_pt_"

# Test connection
python -c "from langsmith import Client; print(Client().info())"
```

### Gemini API errors
```bash
# Verify key
python -c "import os; print(os.getenv('GOOGLE_API_KEY'))"

# Test API
python -c "from langchain_google_genai import ChatGoogleGenerativeAI; llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash-exp'); print(llm.invoke('test'))"
```

---

## 📚 NEXT STEPS

**Tomorrow (Day 2)**:
- Add Bespoke testing framework
- Create LangGraph workflow
- Add centralized validation
- Test multi-agent debate

**See**: `ULTIMATE_COMPLETE_PLAN_FINAL.md` for full 12-week plan

---

**🎯 GOAL**: By end of Day 1, you should have a working foundation with memory, tracing, and simple debate.**

**💪 LET'S GO!**

