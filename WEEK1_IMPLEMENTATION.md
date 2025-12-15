# Week 1 Implementation Guide - Day by Day

## 🎯 Week 1 Goal
Build the foundation: LangSmith observability + Business memory + Research agents

---

## DAY 1: LangSmith Setup (30 minutes)

### Why This is CRITICAL
From the videos: "LangSmith is essential for debugging deep agents. Without it, you're flying blind."

### Step-by-Step

#### 1. Get LangSmith API Key (5 min)
```bash
# Go to: https://smith.langchain.com/settings
# Click "Create API Key"
# Copy the key (starts with lsv2_pt_...)
```

#### 2. Add to .env (1 min)
```bash
cd /home/sina/projects/group_agent
source venv/bin/activate

cat >> .env << 'EOF'

# LangSmith Observability (CRITICAL)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_YOUR_KEY_HERE
LANGCHAIN_PROJECT=ai-eos-production
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
EOF
```

#### 3. Install LangSmith (2 min)
```bash
pip install -U langsmith langgraph
```

#### 4. Test It Works (2 min)
```bash
python -c "
import os
os.environ['LANGCHAIN_TRACING_V2'] = 'true'
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model='gpt-4o-mini')
response = llm.invoke('Test trace')
print('✅ LangSmith working!')
print('View at: https://smith.langchain.com/')
"
```

#### 5. Verify in UI (5 min)
- Open https://smith.langchain.com/
- Go to "Projects" → "ai-eos-production"
- You should see your test trace
- Click on it to see full details

**✅ Deliverable:** Every LLM call now automatically traced

---

## DAY 2-3: Business Memory System (2 days)

### Why This is Your Moat
Your friend's insight: Intelligence that LEARNS from past decisions is valuable. Stateless agents are toys.

### Implementation

#### Create memory/business_context.py
```bash
mkdir -p memory
touch memory/__init__.py
```

See the complete implementation in `memory/business_context.py` (created separately).

#### Key Features:
1. **Projects tracking** - Know what's happening
2. **Stakeholder relationships** - Remember who said what
3. **Decision history** - Learn from past
4. **Communication history** - Context for everything
5. **Financial tracking** - Budget awareness
6. **Persistent storage** - JSON file (upgrade to PostgreSQL later)

#### Test It (Day 3)
```bash
python -c "
from memory.business_context import BusinessMemory

# Create memory
memory = BusinessMemory()

# Add a decision
memory.add_decision({
    'question': 'Should we expand to Turkey?',
    'outcome': 'success',
    'roi': 0.42,
    'strategy_used': 'Pilot program first'
})

# Save
memory.save()

# Load
memory2 = BusinessMemory.load()
print(f'Loaded {len(memory2.decisions)} decisions')
print('✅ Memory working!')
"
```

**✅ Deliverable:** Memory persists across sessions

---

## DAY 4-5: Research Agents (2 days)

### Why This is Your Friend's Vision
"Multi-LLM debate + Research agents = REAL VALUE"

### Implementation

#### Create agents/research_agents.py
```bash
mkdir -p agents
touch agents/__init__.py
```

See the complete implementation in `agents/research_agents.py` (created separately).

#### 4 Research Agents:

**1. SEO Agent**
- Persian keyword research
- Search volume analysis
- Competition assessment
- Example: "آموزش سگ" → 15K searches/month, low competition

**2. Market Agent**
- TAM/SAM/SOM calculation
- Demographics analysis
- Example: "Tehran: 500K pets, 2M owners"

**3. Financial Agent**
- ROI calculations
- Break-even analysis
- Example: "Break-even: 300 customers at 200K/mo"

**4. Competitor Agent**
- SWOT analysis
- Positioning map
- Example: "0 direct competitors in Persian"

#### Test It (Day 5)
```bash
python agents/research_agents.py
# Should run all 4 agents and generate report
```

**✅ Deliverable:** Research agents working, generating reports

---

## DAY 6-7: Integration & Testing (2 days)

### Integrate Memory with Debate System

#### Update src/agents/debate_system.py

Add memory loading node:
```python
from memory.business_context import BUSINESS_MEMORY

def load_context_node(state: DebateState) -> dict:
    """Load relevant business context from memory"""
    
    # Find similar past decisions
    question_lower = state["question"].lower()
    
    similar_decisions = []
    for decision in BUSINESS_MEMORY.decisions:
        if any(word in decision.get("question", "").lower() 
               for word in question_lower.split() if len(word) > 4):
            similar_decisions.append(decision)
    
    # Calculate success rate
    total = len(similar_decisions)
    successful = sum(1 for d in similar_decisions if d.get("outcome") == "success")
    success_rate = successful / total if total > 0 else 0.5
    
    return {
        "past_similar_decisions": similar_decisions[:5],
        "success_rate": success_rate
    }
```

Add to graph:
```python
workflow.add_node("load_context", load_context_node)
workflow.set_entry_point("load_context")
workflow.add_edge("load_context", "analyst")
```

Update agent prompts to use history:
```python
ANALYST_PROMPT = """You are a DATA-DRIVEN ANALYST with access to company history.

**Available Context:**
{past_decisions}

Learn from past outcomes. Reference similar decisions in your analysis.
"""
```

### Test End-to-End (Day 7)
```bash
# Seed some past decisions
python -c "
from memory.business_context import BUSINESS_MEMORY

BUSINESS_MEMORY.add_decision({
    'question': 'Should we expand to Turkey market?',
    'outcome': 'success',
    'roi': 0.42,
    'strategy_used': 'Pilot program first'
})

BUSINESS_MEMORY.add_decision({
    'question': 'Should we expand to Egypt market?',
    'outcome': 'failed',
    'roi': -0.15,
    'strategy_used': 'Full launch immediately',
    'failure_reason': 'Didn't understand local regulations'
})
"

# Run debate with memory
python src/agents/debate_system.py
```

**✅ Deliverable:** Debate system references past decisions, learns from history

---

## Week 1 Success Criteria

By end of Day 7, you should have:

1. ✅ **LangSmith working** - Every call traced
2. ✅ **Business memory persisting** - Decisions saved/loaded
3. ✅ **Research agents functional** - 4 agents generating reports
4. ✅ **Debate system learning** - References past decisions
5. ✅ **All tests passing** - End-to-end flow works

---

## Next Steps

**Week 2:** Growth Engine (SEO/AEO/GEO) - Your unique competitive advantage

See `WEEK2_IMPLEMENTATION.md` for details.

