# 🚀 START HERE FIRST - AI-EOS Complete Setup
**The ONLY file you need to read to get started**

---

## ⏱️ 30-Minute Quick Start (DO THIS NOW)

### What You're Building
**AI-EOS**: Persian-first multi-agent strategic advisory system that makes intelligent business decisions using:
- Multi-LLM debate (Gemini FREE + Claude)
- Research engine (SEO, Market, Financial, Competitor)
- Growth engine (SEO/AEO/GEO)
- Self-editing memory (learns from every interaction)

**NOT building**: Email/calendar automation ("hello world of agents" per your friend)

---

## 🎯 Step 1: LangSmith Setup (5 minutes) - CRITICAL

**Why first?** Without LangSmith tracing, debugging AI agents is impossible. Every LLM call must be traced.

```bash
# 1. Get LangSmith API key (2 min)
# Open: https://smith.langchain.com/settings
# Click "Create API Key"
# Copy the key (starts with lsv2_pt_)

# 2. Create .env file (1 min)
cp .env.example .env

# 3. Edit .env and add your LangSmith key
# LANGCHAIN_API_KEY=lsv2_pt_YOUR_KEY_HERE
```

---

## 🐍 Step 2: Python Environment (5 minutes)

```bash
# 1. Check Python version (must be 3.11+)
python --version  # Should show Python 3.11.x or higher

# If not, install Python 3.11:
# macOS: brew install python@3.11
# Ubuntu: sudo apt install python3.11
# Windows: Download from python.org

# 2. Create virtual environment
python3.11 -m venv venv

# 3. Activate it
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate

# 4. Upgrade pip
pip install --upgrade pip
```

---

## 📦 Step 3: Install Dependencies (3 minutes)

```bash
# Install ALL dependencies (exact versions from plan)
pip install -r requirements-dev.txt

# This installs:
# - LangGraph 0.2.53 (latest orchestration)
# - LangSmith 0.2.11 (observability)
# - Letta 0.6.4 (self-editing memory)
# - All LLM providers (OpenAI, Anthropic, Google)
# - Testing tools (pytest, pytest-asyncio)
```

---

## ✅ Step 4: Verify Setup (2 minutes)

```bash
# Run verification script
python scripts/verify_setup.py

# Expected output:
# ✅ Environment variables check
# ✅ LangSmith tracing working
# ✅ All dependencies installed
# ✅ Ready to build!
```

**If verification fails:**
1. Check `.env` file has correct API keys
2. Make sure virtual environment is activated
3. Re-run `pip install -r requirements-dev.txt`

---

## 🔑 Step 5: Get API Keys (15 minutes)

### Required (Must have to start):

**1. LangSmith** (Free tier) ✅ DONE ABOVE
- Already got this in Step 1
- View traces: https://smith.langchain.com/

**2. OpenAI** (For testing - $5 credit)
- Go to: https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy and add to `.env`: `OPENAI_API_KEY=sk-proj-...`

**3. Google Gemini** (FREE tier - 1,500 requests/day!)
- Go to: https://aistudio.google.com/app/apikey
- Click "Create API key"
- Copy and add to `.env`: `GOOGLE_API_KEY=...`

### Optional (Get later in Week 3):

**4. Anthropic Claude** (Powerful but paid)
- Go to: https://console.anthropic.com/
- Get $5 credit for testing
- Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

**5. Tavily** (Web search - 1,000 free searches/month)
- Go to: https://tavily.com/
- Sign up, get API key
- Add to `.env`: `TAVILY_API_KEY=tvly-...`

---

## 🎉 YOU'RE READY!

Your setup is complete when:
- ✅ LangSmith tracing working (`python scripts/verify_setup.py` passes)
- ✅ At least OpenAI OR Gemini API key configured
- ✅ Virtual environment activated

---

## 📅 What to Do Next (Choose Your Path)

### Path A: Follow Week-by-Week Plan (Recommended)
```bash
# Read the complete 12-week implementation plan
open docs/WEEK_BY_WEEK_PLAN.md

# Start with Week 1, Day 1
# Each day has:
# - Specific tasks
# - Code to copy-paste
# - Tests to verify
# - Deliverables
```

### Path B: Quick Demo First (See it working)
```bash
# Run simple LangSmith tracing demo
python examples/01_langsmith_demo.py

# Expected: Trace appears at https://smith.langchain.com/

# Run simple debate demo (requires Week 2 code)
python examples/02_simple_debate_demo.py
```

### Path C: Read Architecture First
```bash
# Understand the complete system
open docs/ARCHITECTURE.md

# See all components:
# - Layer 1: Observability (LangSmith)
# - Layer 2: Memory (Letta)
# - Layer 3: Intelligence (Multi-agent debate)
# - Layer 4: Research (4 agents)
# - Layer 5: Growth (SEO/AEO/GEO)
# - Layer 6: Deep agents
# - Layer 7: Production deployment
```

---

## 📁 Project Structure

```
AgentAndEtc/
├── 00_START_HERE_FIRST.md          ← YOU ARE HERE
├── .env                             ← Your API keys (SECRET)
├── .env.example                     ← Template
├── requirements-dev.txt             ← All dependencies
│
├── docs/                            ← Documentation
│   ├── WEEK_BY_WEEK_PLAN.md        ← 12-week implementation
│   ├── ARCHITECTURE.md              ← System design
│   ├── DEVELOPMENT_GUIDE.md         ← How to build
│   └── DEPLOYMENT_GUIDE.md          ← How to deploy
│
├── scripts/                         ← Utility scripts
│   ├── verify_setup.py             ← Check everything works
│   ├── test_langsmith.py           ← Test tracing
│   └── run_week1_tests.py          ← Week 1 validation
│
├── examples/                        ← Working demos
│   ├── 01_langsmith_demo.py        ← Tracing demo
│   ├── 02_simple_debate_demo.py    ← Multi-agent demo
│   └── 03_research_demo.py         ← Research agents
│
├── src/                             ← Source code (build starting Week 1)
│   ├── agents/                     ← Multi-agent system
│   ├── memory/                     ← Letta integration
│   ├── tools/                      ← Research/growth tools
│   ├── middleware/                 ← Caching, summarization
│   └── utils/                      ← Helper functions
│
├── tests/                           ← Bespoke tests
│   ├── conftest.py                 ← PyTest configuration
│   ├── test_week1/                 ← Week 1 tests
│   ├── test_week2/                 ← Week 2 tests
│   └── ...
│
└── ULTIMATE_COMPLETE_PLAN_FINAL.md ← Master plan (2,451 lines)
```

---

## 🆘 Troubleshooting

### Issue: "LANGCHAIN_TRACING_V2 not set"
**Fix**: Check `.env` file exists and has `LANGCHAIN_TRACING_V2=true`

### Issue: "No module named 'langgraph'"
**Fix**: Activate virtual environment: `source venv/bin/activate`

### Issue: "API key invalid"
**Fix**: 
1. Check you copied the FULL key (no spaces)
2. LangSmith keys start with `lsv2_pt_`
3. OpenAI keys start with `sk-proj-` or `sk-`
4. Gemini keys are alphanumeric (no prefix)

### Issue: Traces not showing in LangSmith
**Fix**:
1. Wait 10 seconds (traces can be delayed)
2. Check project name matches: `LANGCHAIN_PROJECT=ai-eos-production`
3. Verify API key is correct

---

## 💡 Pro Tips

1. **Always check LangSmith first** when debugging
   - Every LLM call is traced
   - See exact prompts, responses, timing, costs
   - Use Polly AI to ask "Why did this fail?"

2. **Use Gemini FREE tier for development**
   - 1,500 requests/day
   - Fast and capable
   - Switch to Claude only for production arbiter

3. **Run tests after every change**
   ```bash
   pytest tests/test_week1/ -v
   ```

4. **Commit often**
   ```bash
   git add .
   git commit -m "feat: Add [feature]"
   git push
   ```

5. **Follow the plan sequentially**
   - Week 1 → Week 2 → Week 3 → ...
   - Don't skip weeks
   - Each builds on previous

---

## 🎯 Success Criteria (Week 1)

By end of Week 1, you should have:
- ✅ LangSmith auto-tracing every LLM call
- ✅ Letta memory system working (agents can self-edit)
- ✅ Bespoke testing framework (custom criteria per test)
- ✅ LangGraph Studio running (visual debugging)

**Time investment**: ~20 hours (3 hours/day)
**Cost**: ~$10 (mostly for API testing)

---

## 🚀 Ready to Build?

**Next steps:**
1. ✅ Verify setup passed (`python scripts/verify_setup.py`)
2. 📖 Read `docs/WEEK_BY_WEEK_PLAN.md`
3. 💻 Start Week 1, Day 1: Letta memory setup
4. 🧪 Run tests to verify each step
5. 📊 Check LangSmith for all traces

**Questions?** 
- Check `docs/FAQ.md`
- Read `ULTIMATE_COMPLETE_PLAN_FINAL.md` (complete reference)
- Review research docs: `barobach.md`, `langnew.md`, `nowlookatthis.md`

---

## 🎬 Quick Command Reference

```bash
# Activate environment
source venv/bin/activate

# Verify setup
python scripts/verify_setup.py

# Run all tests
pytest tests/ -v

# Run specific week tests
pytest tests/test_week1/ -v

# Start Letta server
letta server

# Start LangGraph Studio
langgraph dev

# View traces
open https://smith.langchain.com/
```

---

**YOU'VE GOT THIS! LET'S BUILD SOMETHING VALUABLE.** 🔥

*Remember: Your friend said "Email/calendar agents = hello world."*
*We're building strategic intelligence, not automation.*
*Multi-agent debate + Research engine + Growth optimization = VALUABLE.*