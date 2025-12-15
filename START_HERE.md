# 🚀 START HERE - AI-EOS Complete Setup Guide

**Last Updated**: December 16, 2025, 1:33 AM +0330

## ⚡ Quick Overview

This project implements an **AI Enterprise Operating System (AI-EOS)** for Persian enterprises with:
- Multi-agent debate system (4 specialized agents)
- Research engine (SEO, Market, Financial, Competitor analysis)
- Growth engine (SEO/AEO/GEO optimization)
- Stateful memory that learns from every interaction
- Full observability and debugging

**Timeline**: 12 weeks from zero to production
**First milestone**: Working system with memory in 1 week

---

## 📋 Prerequisites

### Required
- Python 3.11+ (Check: `python --version`)
- Git (Check: `git --version`)
- Text editor (VS Code recommended)
- 30 minutes for initial setup

### Accounts Needed (All FREE to start)
1. **LangSmith** (CRITICAL - MUST HAVE FIRST): https://smith.langchain.com
2. **Google AI Studio** (for Gemini FREE tier): https://aistudio.google.com
3. **Anthropic** (optional, for Claude): https://console.anthropic.com
4. **OpenAI** (optional, for GPT): https://platform.openai.com

---

## 🎯 Phase 1: Critical Setup (30 Minutes) - DO THIS FIRST

### Step 1: Clone Repository (2 minutes)

```bash
# Clone the repo
git clone https://github.com/Si-36/AgentAndEtc.git
cd AgentAndEtc

# Create virtual environment
python3.11 -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Verify Python version
python --version  # Should show 3.11+
```

### Step 2: Install Dependencies (3 minutes)

```bash
# Install all required packages
pip install -r requirements.txt

# Verify installation
python -c "import langgraph; print('✅ LangGraph installed')"
python -c "import langsmith; print('✅ LangSmith installed')"
python -c "import letta; print('✅ Letta installed')"
```

### Step 3: Get LangSmith API Key (5 minutes) - CRITICAL

**This is THE MOST IMPORTANT step. Without LangSmith, you cannot debug AI agents.**

1. Go to https://smith.langchain.com/settings
2. Click "Create API Key"
3. Name it: `ai-eos-production`
4. Copy the key (starts with `lsv2_pt_`)
5. Save it somewhere safe

### Step 4: Get Google Gemini API Key (3 minutes)

**Gemini has a FREE tier - we use this for 90% of calls to save money.**

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Save it

### Step 5: Create Environment File (2 minutes)

```bash
# Copy template
cp .env.example .env

# Edit .env file (use your favorite editor)
nano .env
# OR
code .env
```

**Edit `.env` and add your keys:**

```bash
# ============================================
# CRITICAL - MUST SET THESE NOW
# ============================================
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_YOUR_KEY_HERE    # From Step 3
LANGCHAIN_PROJECT=ai-eos-production

# ============================================
# LLM APIs
# ============================================
GOOGLE_API_KEY=YOUR_GEMINI_KEY_HERE        # From Step 4

# Optional (get these later)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

### Step 6: Verify Setup (5 minutes)

```bash
# Run verification script
python scripts/verify_setup.py
```

**Expected output:**
```
🔍 Verifying AI-EOS Setup

1. Environment Variables
✅ All required variables set

2. LangSmith Tracing
✅ LangSmith tracing WORKING!
   View at: https://smith.langchain.com/

✅ Setup verified! Ready to build.
```

### Step 7: Test Your First Agent (10 minutes)

```bash
# Run the hello world test
python tests/test_langsmith.py
```

**Now open https://smith.langchain.com/ and you should see your first trace!**

---

## ✅ Phase 1 Complete Checklist

- [ ] Python 3.11+ installed
- [ ] Repository cloned
- [ ] Virtual environment activated
- [ ] All dependencies installed (requirements.txt)
- [ ] LangSmith API key obtained
- [ ] Google Gemini API key obtained
- [ ] `.env` file created with keys
- [ ] `verify_setup.py` shows all green ✅
- [ ] First trace visible in LangSmith dashboard

**If ALL checkboxes are checked, proceed to Phase 2.**

---

## 🏗️ Phase 2: What to Build (Week by Week)

Now that setup is complete, follow the detailed implementation plan:

### Week 1: Foundation
**Location**: See `docs/WEEK_1_FOUNDATION.md`

- [x] Day 1: LangSmith setup ✅ (You just did this!)
- [ ] Day 2-3: Letta memory system
- [ ] Day 4-5: Bespoke testing framework
- [ ] Day 6-7: LangGraph CLI + Studio

**Start here**: `docs/WEEK_1_FOUNDATION.md`

### Weeks 2-12
See full plan in `ULTIMATE_COMPLETE_PLAN_FINAL.md`

---

## 📁 Project Structure

```
AgentAndEtc/
├── START_HERE.md                 ← YOU ARE HERE
├── README.md                      ← Project overview
├── ULTIMATE_COMPLETE_PLAN_FINAL.md  ← Master plan (2451 lines)
├── requirements.txt               ← Python dependencies
├── .env.example                   ← Environment template
├── .env                           ← Your keys (DO NOT COMMIT)
│
├── agents/                        ← Week 2-4 implementation
├── memory/                        ← Week 1 implementation
├── tools/                         ← Agent tools
├── tests/                         ← Testing framework
├── scripts/                       ← Utility scripts
├── config/                        ← Configuration files
├── docs/                          ← Documentation
└── templates/                     ← Vertical SaaS templates
```

See `docs/PROJECT_STRUCTURE.md` for complete details.

---

## 🚀 Next Steps

### Immediate (Right Now)
1. Complete Phase 1 setup (30 minutes)
2. Verify all checkboxes are ✅
3. See your first trace in LangSmith

### Today
4. Read `docs/WEEK_1_FOUNDATION.md`
5. Start Day 2: Letta memory setup

### This Week
6. Complete Week 1 (Foundation)
7. Have working memory system

---

## 📚 Key Documents

### Must Read First
1. **This file** (START_HERE.md) - Setup guide
2. `ULTIMATE_COMPLETE_PLAN_FINAL.md` - Complete master plan
3. `docs/WEEK_1_FOUNDATION.md` - Your next steps

### Reference
4. `docs/IMPLEMENTATION_ROADMAP.md` - 12-week timeline
5. `docs/TROUBLESHOOTING.md` - Common issues

---

## ✅ Ready to Build?

If you've completed Phase 1 setup:

```bash
# Verify everything is ready
python scripts/verify_setup.py

# If all green, start Week 1
cat docs/WEEK_1_FOUNDATION.md
```

**Let's build! 🚀**
