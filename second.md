# 🔥 **PHASE 1 COMPLETE - NOTHING REMOVED, BEST-OF-BREED ARCHITECTURE**

Based on all research + videos indexed, here's the **COMPLETE Phase 1 plan** with **ZERO compromises**:

***

## 🎯 **PRODUCT DEFINITION**

**AI Group Advisory Agent** = Multi-Model Collective Intelligence System

**Core Value Proposition:**
- 4 AI models debate in TRUE parallel (not sequential)
- Cross-critique + opinion evolution (R1 → R2)
- Conflict detection + consensus scoring
- Plans A/B/C synthesis
- Perpetual learning (memory-based, no fine-tuning)
- Production-ready Persian UI

***

## 🏗️ **HYBRID ARCHITECTURE - BEST OF EVERYTHING**

```
┌─────────────────────────────────────────────────────┐
│  LAYER 1: FRONTEND (Next.js 15 + React 19.2)       │
│  ├── CopilotKit v1.50 (multi-agent UI + threading) │
│  ├── TanStack Query v5 (SSE streaming + cache)     │
│  ├── Zustand (global state management)             │
│  ├── shadcn/ui (components)                        │
│  └── Tailwind 4.0 (RTL Persian styling)            │
└────────────────────┬────────────────────────────────┘
                     │ SSE WebSocket
                     ↓
┌─────────────────────────────────────────────────────┐
│  LAYER 2: API GATEWAY (FastAPI + Python 3.12)      │
│  ├── /api/debate (main endpoint)                   │
│  ├── /api/feedback (learning loop)                 │
│  ├── /api/history (past debates)                   │
│  └── SSE streaming middleware                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│  LAYER 3: ORCHESTRATION (LangGraph 1.0 GA)         │
│  ├── StateGraph with 10 nodes:                     │
│  │   1. proactive_retrieval                        │
│  │   2. round1_parallel (4 agents)                 │
│  │   3. conflict_detection                         │
│  │   4. conditional_critic_spawn                   │
│  │   5. round2_cross_argue                         │
│  │   6. opinion_evolution_calc                     │
│  │   7. confidence_scoring                         │
│  │   8. consensus_calculation                      │
│  │   9. arbiter_synthesis                          │
│  │   10. memory_update                             │
│  ├── Conditional edges (conflict > 0.7 → spawn)    │
│  ├── Parallel execution (asyncio.gather)           │
│  ├── Node caching (skip redundant calls)           │
│  └── Pre/post hooks (Persian quality guards)       │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│  LAYER 4: AGENT RUNTIME (Letta V1 SDK + v0.5.2)    │
│  ├── 5 Stateful Agents:                            │
│  │   • Agent 1: GPT-4o Analyst (Letta)             │
│  │   • Agent 2: Gemini 2.0 Creative (Letta)        │
│  │   • Agent 3: Claude 3.7 Critic (Letta)          │
│  │   • Agent 4: DeepSeek V3 Risk (Letta)           │
│  │   • Agent 5: Claude 3.7 Arbiter (Letta)         │
│  ├── Memory Blocks (Core/Conversational/Archival)  │
│  ├── Self-Editing Tools:                           │
│  │   - memory_insert                               │
│  │   - memory_rethink                              │
│  │   - memory_delete                               │
│  │   - ignore_tool (skip irrelevant)              │
│  ├── Tool Rules v0.5.2 (behavior constraints)      │
│  └── Cross-platform Learning SDK                   │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│  LAYER 5: DATA & INTELLIGENCE                      │
│  ├── PostgreSQL 16 + pgvector (Supabase)           │
│  │   - agent_archival (debates storage)            │
│  │   - embeddings (vector search)                  │
│  │   - user_feedback (learning data)               │
│  ├── Redis (Upstash) - Stream caching + sessions   │
│  ├── Sentence Transformers (all-MiniLM-L6-v2)      │
│  │   - Conflict detection embeddings               │
│  │   - Opinion evolution distance                  │
│  └── LangSmith (tracing + debugging)               │
└─────────────────────────────────────────────────────┘
```

***

## 🧠 **5-AGENT DETAILED ARCHITECTURE**

### **Agent 1: GPT-4o Analyst (Letta Agent)**

**Letta Core Memory:**
```json
{
  "persona": "Data-driven analyst. Focus on facts, statistics, precedents. Challenge unsupported claims. Verification loops mandatory before conclusions.",
  "communication_style": "Persian professional but warm. No m-dashes (—). No generic AI phrases like 'در نهایت'. Cite sources with [1], [2].",
  "constraints": "Must provide evidence. If uncertain, spawn verification sub-agent. Red flag speculation.",
  "tools_enabled": ["web_search", "calculator", "fact_check_api"]
}
```

**Inspired by:** Jules verification loops (Google video)

**Letta Tools:**
- `web_search(query)` → Perplexity API / Tavily
- `calculator(expression)` → Python eval sandbox
- `spawn_verifier(claim)` → Clone self for fact-checking

***

### **Agent 2: Gemini 2.0 Flash Creative (Letta Agent)**

**Letta Core Memory:**
```json
{
  "persona": "Out-of-box thinker. Anticipate 3 levels: immediate effect, project impact, system consequences. Challenge conventional wisdom.",
  "communication_style": "Persian enthusiastic but grounded. Use metaphors sparingly (max 1 per response). Avoid poetic language.",
  "constraints": "Think in layers: What happens next? 6 months later? 3 years later? Always provide contrarian angle.",
  "tools_enabled": ["scenario_builder", "brainstorm_prompts"]
}
```

**Inspired by:** Jules Level 3 consequence-aware thinking (Google video)

**Letta Tools:**
- `scenario_builder(decision, timeline)` → Generate what-if scenarios
- `brainstorm_prompt(topic)` → Trigger creative thinking patterns

***

### **Agent 3: Claude 3.7 Sonnet Critic (Letta Agent)**

**Letta Core Memory:**
```json
{
  "persona": "Strategic adversary. Find flaws in EVERY argument. Play devil's advocate. Then synthesize all viewpoints into coherent strategy.",
  "communication_style": "Persian direct but respectful. No hedging ('شاید', 'ممکن است'). State opinions boldly.",
  "constraints": "Attack weakest points first. Identify assumptions. Propose counter-strategies. End with synthesis.",
  "tools_enabled": ["logic_analyzer", "risk_matrix"]
}
```

**Inspired by:** Google Critic agent patterns (adversarial debates)

**Letta Tools:**
- `logic_analyzer(argument)` → Detect logical fallacies
- `risk_matrix(options)` → Calculate probability × impact

***

### **Agent 4: DeepSeek V3 Risk Analyst (Letta Agent)**

**Letta Core Memory:**
```json
{
  "persona": "Cost/budget guardian. Obsess over: budget, timeline, hidden costs, Murphy's Law scenarios. Pessimistic but constructive.",
  "communication_style": "Persian cautious but helpful. Use precise numbers. Always provide ranges (min-max estimates).",
  "constraints": "Calculate worst-case. Identify hidden costs. Timeline pessimism (multiply estimates by 1.5x). Budget buffers mandatory.",
  "tools_enabled": ["budget_calculator", "timeline_estimator"]
}
```

**Inspired by:** Insights agent telemetry monitoring (Google video)

**Letta Tools:**
- `budget_calculator(items)` → Itemized cost breakdown
- `timeline_estimator(tasks)` → PERT analysis (optimistic/pessimistic/most-likely)

***

### **Agent 5: Claude 3.7 Arbiter (Letta Agent)**

**Letta Core Memory:**
```json
{
  "persona": "Final decision synthesizer. Receive all debates. Synthesize 3 plans: A (consensus high-confidence), B (balanced moderate-risk), C (conservative safe). Show reasoning.",
  "communication_style": "Persian authoritative but collaborative. Structure outputs clearly (headers, tables, bullets). Use emoji for visual cues.",
  "constraints": "Plans must be mutually exclusive. Each plan needs: goal, steps, risks, mitigations, success probability, 30-sec summary.",
  "tools_enabled": ["consensus_scorer", "plan_generator"]
}
```

**Letta Tools:**
- `consensus_scorer(responses)` → 4-factor algorithm
- `plan_generator(synthesis)` → Markdown structured output

***

## 🔄 **COMPLETE 10-STAGE DEBATE WORKFLOW**

### **Stage 0: Proactive Retrieval** (LangGraph Node)

**Implementation:**
```python
async def proactive_retrieval_node(state: DebateState):
    """Search past debates for context"""
    question = state["user_question"]
    
    # Embed question
    embedding = sentence_transformer.encode(question)
    
    # Semantic search in Letta archival memory
    similar_debates = await supabase.rpc('match_debates', {
        'query_embedding': embedding,
        'match_threshold': 0.7,
        'match_count': 3
    })
    
    # Format context
    context = f"""
    📚 Past Similar Decisions:
    {format_past_debates(similar_debates)}
    """
    
    state["proactive_context"] = context
    return state
```

**Inspired by:** Jules codebase indexing (Google video)

***

### **Stage 1: Round 1 - Parallel Initial Responses** (LangGraph Parallel Node)

**Implementation:**
```python
async def round1_parallel_node(state: DebateState):
    """4 agents respond simultaneously"""
    question = state["user_question"]
    context = state["proactive_context"]
    
    full_prompt = f"{context}\n\n{question}"
    
    # TRUE parallel execution (not sequential!)
    responses = await asyncio.gather(
        letta_client.send_message(
            agent_id=analyst_agent_id,
            message=full_prompt,
            stream_steps=True  # SSE streaming
        ),
        letta_client.send_message(
            agent_id=creative_agent_id,
            message=full_prompt,
            stream_steps=True
        ),
        letta_client.send_message(
            agent_id=critic_agent_id,
            message=full_prompt,
            stream_steps=True
        ),
        letta_client.send_message(
            agent_id=risk_agent_id,
            message=full_prompt,
            stream_steps=True
        )
    )
    
    state["round1_responses"] = {
        "analyst": responses[0],
        "creative": responses[1],
        "critic": responses[2],
        "risk": responses[3]
    }
    
    # Stream to frontend via SSE
    await emit_sse("round1_complete", state["round1_responses"])
    
    return state
```

**Time:** ~20-30 seconds total (parallel, not 4× sequential)

**Inspired by:** Voice pipeline sandwich architecture (streaming video)

***

### **Stage 2: Conflict Detection** (LangGraph Node)

**Implementation:**
```python
async def conflict_detection_node(state: DebateState):
    """Calculate 4×4 similarity matrix"""
    r1 = state["round1_responses"]
    
    # Extract text responses
    texts = [r1["analyst"], r1["creative"], r1["critic"], r1["risk"]]
    
    # Embed all responses
    embeddings = sentence_transformer.encode(texts)
    
    # Cosine similarity matrix
    similarity_matrix = cosine_similarity(embeddings)
    
    # Calculate conflict scores
    conflicts = []
    agents = ["analyst", "creative", "critic", "risk"]
    
    for i in range(4):
        for j in range(i+1, 4):
            score = similarity_matrix[i][j]
            if score < 0.5:  # Low similarity = conflict
                conflicts.append({
                    "agents": [agents[i], agents[j]],
                    "similarity": float(score),
                    "conflict_level": "high" if score < 0.3 else "medium"
                })
    
    state["conflict_matrix"] = similarity_matrix.tolist()
    state["conflicts"] = conflicts
    state["overall_conflict_score"] = 1 - np.mean(similarity_matrix)
    
    # Stream conflict heatmap to UI
    await emit_sse("conflicts_detected", {
        "matrix": state["conflict_matrix"],
        "conflicts": conflicts
    })
    
    return state
```

**Output:** Conflict heatmap for UI visualization

***

### **Stage 3: Conditional Critic Spawn** (LangGraph Conditional Edge)

**Implementation:**
```python
def should_spawn_adversarial_critic(state: DebateState) -> str:
    """Decide if high conflict requires extra critic"""
    conflict_score = state["overall_conflict_score"]
    
    if conflict_score > 0.7:  # High disagreement
        return "spawn_critic"
    else:
        return "round2_cross_argue"

# LangGraph conditional edge
graph.add_conditional_edges(
    "conflict_detection",
    should_spawn_adversarial_critic,
    {
        "spawn_critic": "adversarial_critic_node",
        "round2_cross_argue": "round2_node"
    }
)

async def adversarial_critic_node(state: DebateState):
    """Clone Critic agent for extra adversarial analysis"""
    # Clone existing Critic agent
    adversarial_agent_id = await letta_client.clone_agent(
        source_id=critic_agent_id,
        name="Adversarial Critic (Temporary)"
    )
    
    # Give it extra adversarial instructions
    adversarial_prompt = f"""
    EXTREME ADVERSARIAL MODE:
    The 4 agents strongly disagree (conflict score: {state['overall_conflict_score']:.2f}).
    
    Your job: Attack ALL positions. Find the weakest arguments. Expose hidden assumptions.
    Be brutally honest about risks.
    
    Round 1 responses:
    {format_r1_responses(state["round1_responses"])}
    """
    
    adversarial_response = await letta_client.send_message(
        agent_id=adversarial_agent_id,
        message=adversarial_prompt
    )
    
    state["adversarial_critique"] = adversarial_response
    
    # Delete temporary agent
    await letta_client.delete_agent(adversarial_agent_id)
    
    await emit_sse("adversarial_critique", adversarial_response)
    
    return state
```

**Inspired by:** Google Critic agent spawning on high complexity

***

### **Stage 4: Round 2 - Cross-Arguing** (LangGraph Node)

**Implementation:**
```python
async def round2_cross_argue_node(state: DebateState):
    """Each agent sees ALL R1 responses + can critique others"""
    r1 = state["round1_responses"]
    conflicts = state["conflicts"]
    adversarial = state.get("adversarial_critique", "")
    
    # Build cross-critique prompt for each agent
    def build_r2_prompt(agent_name: str):
        return f"""
        🔄 ROUND 2: Cross-Critique & Evolution
        
        Your Round 1 response:
        {r1[agent_name]}
        
        Other agents said:
        - Analyst: {r1["analyst"][:500]}...
        - Creative: {r1["creative"][:500]}...
        - Critic: {r1["critic"][:500]}...
        - Risk: {r1["risk"][:500]}...
        
        Conflicts detected:
        {format_conflicts(conflicts)}
        
        {f"Adversarial critique: {adversarial}" if adversarial else ""}
        
        NOW:
        1. Critique others' blind spots
        2. Can you change your mind?
        3. What did they miss?
        4. Strengthen your argument OR pivot
        
        Be specific. Reference other agents by name.
        """
    
    # Parallel R2 execution
    r2_responses = await asyncio.gather(
        letta_client.send_message(
            agent_id=analyst_agent_id,
            message=build_r2_prompt("analyst"),
            stream_steps=True
        ),
        letta_client.send_message(
            agent_id=creative_agent_id,
            message=build_r2_prompt("creative"),
            stream_steps=True
        ),
        letta_client.send_message(
            agent_id=critic_agent_id,
            message=build_r2_prompt("critic"),
            stream_steps=True
        ),
        letta_client.send_message(
            agent_id=risk_agent_id,
            message=build_r2_prompt("risk"),
            stream_steps=True
        )
    )
    
    state["round2_responses"] = {
        "analyst": r2_responses[0],
        "creative": r2_responses[1],
        "critic": r2_responses[2],
        "risk": r2_responses[3]
    }
    
    await emit_sse("round2_complete", state["round2_responses"])
    
    return state
```

**Inspired by:** CopilotKit pizza arguing demo (agent.setMessages pattern)

***

### **Stage 5: Opinion Evolution Tracking** (LangGraph Node)

**Implementation:**
```python
async def opinion_evolution_node(state: DebateState):
    """Calculate how much each agent changed their mind"""
    r1 = state["round1_responses"]
    r2 = state["round2_responses"]
    
    evolution_scores = {}
    
    for agent in ["analyst", "creative", "critic", "risk"]:
        # Embed R1 and R2
        r1_embedding = sentence_transformer.encode(r1[agent])
        r2_embedding = sentence_transformer.encode(r2[agent])
        
        # Cosine distance (1 - similarity)
        distance = 1 - cosine_similarity([r1_embedding], [r2_embedding])[0][0]
        
        evolution_scores[agent] = {
            "distance": float(distance),
            "changed_mind": distance > 0.3,  # Threshold for "significant change"
            "interpretation": (
                "Major pivot" if distance > 0.5 else
                "Moderate evolution" if distance > 0.3 else
                "Reinforced position"
            )
        }
    
    state["opinion_evolution"] = evolution_scores
    state["avg_evolution"] = np.mean([s["distance"] for s in evolution_scores.values()])
    
    await emit_sse("opinion_evolution", evolution_scores)
    
    return state
```

**This is UNIQUE to our system** - tracks intellectual flexibility

***

### **Stage 6: Confidence Scoring** (LangGraph Node)

**Implementation:**
```python
async def confidence_scoring_node(state: DebateState):
    """Each agent self-assesses certainty"""
    r2 = state["round2_responses"]
    
    confidence_prompt = """
    Rate your confidence in your Round 2 recommendation:
    
    - HIGH (80-100%): Strong evidence, clear path, low risk
    - MEDIUM (50-79%): Some uncertainty, needs validation
    - LOW (<50%): Speculative, requires more research
    
    Return ONLY: {"confidence": "HIGH/MEDIUM/LOW", "reasoning": "1-sentence explanation"}
    """
    
    # Ask each agent to self-assess
    confidence_scores = {}
    
    for agent_name, agent_id in [
        ("analyst", analyst_agent_id),
        ("creative", creative_agent_id),
        ("critic", critic_agent_id),
        ("risk", risk_agent_id)
    ]:
        response = await letta_client.send_message(
            agent_id=agent_id,
            message=confidence_prompt
        )
        
        # Parse JSON response
        confidence_data = json.loads(response)
        confidence_scores[agent_name] = confidence_data
    
    state["confidence_scores"] = confidence_scores
    
    # Check if any agent has LOW confidence → trigger verification
    low_confidence_agents = [
        agent for agent, data in confidence_scores.items()
        if data["confidence"] == "LOW"
    ]
    
    state["needs_verification"] = len(low_confidence_agents) > 0
    state["low_confidence_agents"] = low_confidence_agents
    
    await emit_sse("confidence_scores", confidence_scores)
    
    return state
```

**Inspired by:** Jules confidence levels (Google video)

**UI Display:** Green (HIGH) / Yellow (MEDIUM) / Red (LOW) badges

***

### **Stage 7: Verification Loop** (LangGraph Conditional Node)

**Implementation:**
```python
def should_verify(state: DebateState) -> str:
    """Decide if low confidence requires fact-checking"""
    return "verify" if state["needs_verification"] else "consensus_scoring"

graph.add_conditional_edges(
    "confidence_scoring",
    should_verify,
    {
        "verify": "verification_node",
        "consensus_scoring": "consensus_node"
    }
)

async def verification_node(state: DebateState):
    """Spawn fact-checker sub-agent"""
    low_conf_agents = state["low_confidence_agents"]
    r2 = state["round2_responses"]
    
    # Extract claims that need verification
    claims_to_verify = []
    for agent in low_conf_agents:
        claims_to_verify.append({
            "agent": agent,
            "claim": r2[agent][:500]  # First 500 chars
        })
    
    # Clone Analyst agent for verification
    verifier_id = await letta_client.clone_agent(
        source_id=analyst_agent_id,
        name="Fact Verifier (Temporary)"
    )
    
    verification_prompt = f"""
    FACT-CHECK MODE:
    These claims have LOW confidence from agents. Verify them:
    
    {format_claims(claims_to_verify)}
    
    For each claim:
    1. Search for evidence (use web_search tool)
    2. Rate accuracy: TRUE / PARTIALLY_TRUE / FALSE / UNVERIFIABLE
    3. Provide sources
    
    Return structured JSON.
    """
    
    verification_results = await letta_client.send_message(
        agent_id=verifier_id,
        message=verification_prompt
    )
    
    state["verification_results"] = json.loads(verification_results)
    
    await letta_client.delete_agent(verifier_id)
    
    await emit_sse("verification_complete", state["verification_results"])
    
    return state
```

**Inspired by:** Jules test generation (Google video)

***

### **Stage 8: Consensus Scoring** (LangGraph Node)

**Implementation:**
```python
async def consensus_scoring_node(state: DebateState):
    """4-factor weighted consensus algorithm"""
    r1 = state["round1_responses"]
    r2 = state["round2_responses"]
    similarity_matrix = np.array(state["conflict_matrix"])
    evolution = state["opinion_evolution"]
    confidence = state["confidence_scores"]
    
    # Factor 1: Agreement (0.25 weight)
    agreement_score = np.mean(similarity_matrix)
    
    # Factor 2: Opinion Change (0.40 weight) - HIGHEST!
    avg_evolution = state["avg_evolution"]
    evolution_score = min(avg_evolution / 0.5, 1.0)  # Normalize to [0, 1]
    
    # Factor 3: Evidence Quality (0.20 weight)
    # Use GPT-4o to judge evidence strength
    evidence_judge_prompt = f"""
    Rate the overall evidence quality across all 4 agents (0-1 scale):
    
    Analyst R2: {r2["analyst"][:300]}
    Creative R2: {r2["creative"][:300]}
    Critic R2: {r2["critic"][:300]}
    Risk R2: {r2["risk"][:300]}
    
    Return ONLY a number 0.0-1.0
    """
    
    evidence_score_raw = await openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": evidence_judge_prompt}],
        temperature=0
    )
    evidence_score = float(evidence_score_raw.choices[0].message.content.strip())
    
    # Factor 4: Risk Level (0.15 weight)
    # Lower risk = higher score
    risk_level = extract_risk_level(r2["risk"])  # Parse risk agent's assessment
    risk_score = 1 - risk_level  # Invert (high risk = low score)
    
    # Weighted consensus
    consensus_score = (
        0.25 * agreement_score +
        0.40 * evolution_score +  # Evolution = intelligent debate!
        0.20 * evidence_score +
        0.15 * risk_score
    )
    
    state["consensus_breakdown"] = {
        "agreement": agreement_score,
        "evolution": evolution_score,
        "evidence": evidence_score,
        "risk": risk_score,
        "final": consensus_score
    }
    
    state["consensus_score"] = consensus_score
    
    await emit_sse("consensus_calculated", state["consensus_breakdown"])
    
    return state
```

**Inspired by:** Free-MAD paper + your requirements

***

### **Stage 9: Arbiter Synthesis** (LangGraph Node)

**Implementation:**
```python
async def arbiter_synthesis_node(state: DebateState):
    """Claude Arbiter generates Plans A/B/C"""
    
    # Build comprehensive synthesis prompt
    synthesis_prompt = f"""
    🎯 FINAL SYNTHESIS - Generate 3 Action Plans
    
    Original Question: {state["user_question"]}
    
    Round 1 Responses:
    - Analyst: {state["round1_responses"]["analyst"][:400]}
    - Creative: {state["round1_responses"]["creative"][:400]}
    - Critic: {state["round1_responses"]["critic"][:400]}
    - Risk: {state["round1_responses"]["risk"][:400]}
    
    Round 2 Evolution:
    - Analyst: {state["round2_responses"]["analyst"][:400]}
    - Creative: {state["round2_responses"]["creative"][:400]}
    - Critic: {state["round2_responses"]["critic"][:400]}
    - Risk: {state["round2_responses"]["risk"][:400]}
    
    Conflicts: {state["conflicts"]}
    Opinion Changes: {state["opinion_evolution"]}
    Confidence Levels: {state["confidence_scores"]}
    Consensus Score: {state["consensus_score"]:.2f}
    
    NOW - Generate 3 distinct plans:
    
    **Plan A (Consensus):**
    - When consensus score > 0.75
    - High confidence from most agents
    - Clear agreement on approach
    
    **Plan B (Balanced):**
    - Addresses dissenting opinions
    - Moderate risk tolerance
    - Hybrid approach
    
    **Plan C (Conservative):**
    - Minimal risk
    - Safe fallback
    - Accounts for worst-case scenarios from Risk agent
    
    For EACH plan provide:
    1. **Goal** (1 sentence)
    2. **Steps** (numbered list, 3-5 steps)
    3. **Success Probability** (percentage)
    4. **Key Risks** (bullet points)
    5. **Mitigations** (how to address risks)
    6. **30-Second Summary** (elevator pitch)
    7. **Best For** (which user profile)
    
    Output in Persian markdown with:
    - Headers (##)
    - Tables for comparison
    - Emoji for visual cues (✅ ⚠️ 🎯)
    - RTL-friendly formatting
    
    NO m-dashes (—). NO generic phrases like "در نهایت".
    """
    
    arbiter_response = await letta_client.send_message(
        agent_id=arbiter_agent_id,
        message=synthesis_prompt,
        stream_steps=True
    )
    
    state["final_plans"] = arbiter_response
    
    await emit_sse("plans_generated", arbiter_response)
    
    return state
```

**Output Format Example:**

```markdown
## 📋 طرح A: اجماع (احتمال موفقیت: 85%)

**هدف:** راه‌اندازی محصول در 3 ماه با تیم 5 نفره

**مراحل:**
1. استخدام 2 توسعه‌دهنده فول‌استک (هفته 1-2)
2. ساخت MVP با فیچرهای اصلی (هفته 3-8)
3. بتا تست با 20 کاربر (هفته 9-10)
4. لانچ عمومی (هفته 11)

**ریسک‌های کلیدی:**
⚠️ تأخیر استخدام (2-3 هفته)
⚠️ باگ‌های غیرمنتظره در بتا

**راه‌حل‌ها:**
✅ شروع جذب از همین حالا
✅ buffer زمانی 1 هفته‌ای

**خلاصه 30 ثانیه:**
تیم کوچک، سرعت بالا، ریسک متوسط. مناسب برای استارتاپ‌هایی که بودجه محدود دارن اما می‌خوان سریع تست کنن.

**مناسب برای:** Founders با بودجه $30k-50k
```

***

### **Stage 10: Memory Update** (LangGraph Final Node)

**Implementation:**
```python
async def memory_update_node(state: DebateState):
    """Store debate in Letta archival memory for all agents"""
    
    # Create debate summary
    debate_summary = {
        "question": state["user_question"],
        "timestamp": datetime.now().isoformat(),
        "consensus_score": state["consensus_score"],
        "chosen_plan": None,  # Will be set after user feedback
        "agent_positions": {
            "analyst": {
                "r1": state["round1_responses"]["analyst"][:200],
                "r2": state["round2_responses"]["analyst"][:200],
                "changed_mind": state["opinion_evolution"]["analyst"]["changed_mind"]
            },
            # ... same for other agents
        },
        "outcome": "pending"  # Will be updated with user feedback
    }
    
    # Insert into archival memory for ALL agents
    for agent_id in [analyst_agent_id, creative_agent_id, critic_agent_id, risk_agent_id]:
        await letta_client.insert_archival_memory(
            agent_id=agent_id,
            content=json.dumps(debate_summary)
        )
    
    # Also store in Supabase for cross-session retrieval
    embedding = sentence_transformer.encode(state["user_question"])
    
    await supabase.table('debates').insert({
        'question': state["user_question"],
        'embedding': embedding.tolist(),
        'summary': debate_summary,
        'plans': state["final_plans"]
    }).execute()
    
    state["debate_id"] = debate_summary["timestamp"]
    
    return state
```

**This enables proactive retrieval in future debates**

***

## 🎨 **FRONTEND ARCHITECTURE (CopilotKit v1.50)**

**Complete UI Implementation:**

```typescript
// app/debate/page.tsx
'use client';

import { useAgent } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';

export default function DebatePage() {
  // Multi-agent setup (CopilotKit v1.50 feature)
  const analystAgent = useAgent({ name: 'analyst', id: 'analyst_gpt4o' });
  const creativeAgent = useAgent({ name: 'creative', id: 'creative_gemini' });
  const criticAgent = useAgent({ name: 'critic', id: 'critic_claude' });
  const riskAgent = useAgent({ name: 'risk', id: 'risk_deepseek' });
  
  const [debateState, setDebateState] = useState<DebateState>({
    round: 0,
    conflicts: [],
    consensusScore: 0,
    plans: null
  });
  
  // SSE streaming connection
  useEffect(() => {
    const eventSource = new EventSource('/api/debate/stream');
    
    eventSource.addEventListener('round1_complete', (e) => {
      const data = JSON.parse(e.data);
      setDebateState(prev => ({ ...prev, round: 1, round1: data }));
    });
    
    eventSource.addEventListener('conflicts_detected', (e) => {
      const data = JSON.parse(e.data);
      setDebateState(prev => ({ ...prev, conflicts: data.conflicts }));
    });
    
    eventSource.addEventListener('round2_complete', (e) => {
      const data = JSON.parse(e.data);
      setDebateState(prev => ({ ...prev, round: 2, round2: data }));
    });
    
    eventSource.addEventListener('plans_generated', (e) => {
      const data = JSON.parse(e.data);
      setDebateState(prev => ({ ...prev, plans: data }));
    });
    
    return () => eventSource.close();
  }, []);
  
  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Question Input */}
      <QuestionInput onSubmit={startDebate} />
      
      {/* 4-Agent Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <AgentCard
          agent={analystAgent}
          title="تحلیلگر (GPT-4o)"
          color="blue"
          response={debateState.round1?.analyst}
          round2={debateState.round2?.analyst}
          confidence={debateState.confidence?.analyst}
        />
        
        <AgentCard
          agent={creativeAgent}
          title="خلاق (Gemini 2.0)"
          color="green"
          response={debateState.round1?.creative}
          round2={debateState.round2?.creative}
          confidence={debateState.confidence?.creative}
        />
        
        <AgentCard
          agent={criticAgent}
          title="منتقد (Claude 3.7)"
          color="red"
          response={debateState.round1?.critic}
          round2={debateState.round2?.critic}
          confidence={debateState.confidence?.critic}
        />
        
        <AgentCard
          agent={riskAgent}
          title="ریسک (DeepSeek V3)"
          color="yellow"
          response={debateState.round1?.risk}
          round2={debateState.round2?.risk}
          confidence={debateState.confidence?.risk}
        />
      </div>
      
      {/* Conflict Heatmap */}
      {debateState.conflicts.length > 0 && (
        <ConflictMatrix conflicts={debateState.conflicts} />
      )}
      
      {/* Opinion Evolution */}
      {debateState.round === 2 && (
        <OpinionEvolutionChart evolution={debateState.evolution} />
      )}
      
      {/* Consensus Score */}
      {debateState.consensusScore > 0 && (
        <ConsensusGauge score={debateState.consensusScore} />
      )}
      
      {/* Plans A/B/C */}
      {debateState.plans && (
        <PlansTabs plans={debateState.plans} onSelectPlan={handlePlanSelect} />
      )}
      
      {/* Feedback Buttons */}
      <FeedbackButtons onFeedback={submitFeedback} />
    </div>
  );
}

// AgentCard component with streaming + time travel
function AgentCard({ agent, title, color, response, round2, confidence }) {
  const [selectedRound, setSelectedRound] = useState<1 | 2>(1);
  
  return (
    <Card className={`border-${color}-500 relative`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{title}</h3>
          <Badge variant={confidenceColor(confidence)}>
            {confidence}
          </Badge>
        </div>
        
        {/* Time Travel Toggle */}
        <Tabs value={selectedRound} onValueChange={setSelectedRound}>
          <TabsList>
            <TabsTrigger value={1}>دور 1</TabsTrigger>
            <TabsTrigger value={2}>دور 2</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Response with streaming typewriter effect */}
        <div className="mt-4 prose prose-sm">
          <TypewriterText text={selectedRound === 1 ? response : round2} />
        </div>
        
        {/* Opinion change indicator */}
        {selectedRound === 2 && evolutionScore > 0.3 && (
          <Badge variant="warning">🔄 نظر تغییر کرد</Badge>
        )}
      </div>
    </Card>
  );
}
```

**Key Features:**
✅ Real-time streaming (SSE)
✅ Time travel (R1 ↔ R2 toggle)
✅ RTL Persian layout
✅ Conflict heatmap visualization
✅ Opinion evolution charts
✅ Consensus gauge (0-100%)
✅ Plans A/B/C comparison table

***

## 🐛 **DEBUGGING & OBSERVABILITY (LangSmith + Custom)**

**Complete Tracing Setup:**

```python
# backend/observability.py
from langsmith import Client, traceable
from langsmith.run_helpers import get_current_run_tree
import json

langsmith_client = Client()

# Decorator for all agent calls
@traceable(
    run_type="llm",
    name="agent_debate_call",
    project_name="ai-group-advisory"
)
async def traced_agent_call(agent_id: str, message: str, round: int):
    """Wrap Letta calls with LangSmith tracing"""
    
    # Start trace
    run_tree = get_current_run_tree()
    run_tree.add_metadata({
        "agent_id": agent_id,
        "round": round,
        "timestamp": datetime.now().isoformat()
    })
    
    try:
        response = await letta_client.send_message(
            agent_id=agent_id,
            message=message
        )
        
        # Log successful response
        run_tree.end(outputs={"response": response})
        
        return response
        
    except Exception as e:
        # Log error
        run_tree.end(error=str(e))
        raise

# Poly-like AI debugging assistant
async def debug_query(question: str):
    """Ask questions about traces"""
    
    # Retrieve recent traces
    traces = langsmith_client.list_runs(
        project_name="ai-group-advisory",
        limit=100
    )
    
    # Use GPT-4o to analyze traces
    debug_prompt = f"""
    User Question: {question}
    
    Recent Traces:
    {json.dumps([{
        'run_id': t.id,
        'agent': t.metadata.get('agent_id'),
        'round': t.metadata.get('round'),
        'duration_ms': t.end_time - t.start_time if t.end_time else None,
        'error': t.error
    } for t in traces], indent=2)}
    
    Answer the user's debugging question based on these traces.
    """
    
    response = await openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": debug_prompt}]
    )
    
    return response.choices[0].message.content

# Bespoke PyTest assertions
def test_opinion_evolution():
    """Custom test: Agents must change minds sometimes"""
    result = run_debate("Should we hire 5 or 10 developers?")
    
    # Assert at least 1 agent changed mind significantly
    assert any(
        evo["distance"] > 0.3
        for evo in result.opinion_evolution.values()
    ), "No agent changed their mind - debate too shallow"
    
    # Assert consensus reached
    assert result.consensus_score > 0.70, f"Consensus too low: {result.consensus_score}"
    
    # Assert Persian quality
    assert "—" not in result.final_plans, "M-dashes detected (Claudeism)"
    assert not contains_generic_phrases(result.final_plans), "Generic AI phrases detected"
    
def test_conflict_detection():
    """Custom test: System must detect real disagreements"""
    result = run_debate("Crypto vs stocks for retirement?")
    
    # Should have conflicts (controversial topic)
    assert len(result.conflicts) > 0, "No conflicts detected on controversial topic"
    assert result.overall_conflict_score > 0.5, "Conflict score too low"
    
def test_verification_triggered():
    """Custom test: Low confidence → verification"""
    result = run_debate("Will AGI arrive by 2027?")
    
    # Speculative question should trigger verification
    assert result.needs_verification, "Verification not triggered for speculative question"
    assert "verification_results" in result, "Verification not executed"
```

**Inspired by:** LangSmith webinar (bespoke eval logic)

***

## 📅 **COMPLETE 8-WEEK TIMELINE**

### **Week 1-2: Foundation (Deliverable: Parallel R1 Working)**

**Infrastructure:**
- [ ] Railway account + project setup
- [ ] Supabase project (PostgreSQL + pgvector)
- [ ] Redis (Upstash) for caching
- [ ] GitHub repo + CI/CD

**Backend:**
- [ ] FastAPI project structure
- [ ] Letta V1 SDK integration
- [ ] Create 5 Letta agents with core memories
- [ ] Test parallel R1 calls (4 agents respond)

**Frontend:**
- [ ] Next.js 15 project
- [ ] CopilotKit v1.50 setup
- [ ] shadcn/ui + Tailwind 4.0 RTL
- [ ] Basic 4-card layout

**Deliverable:** `/api/debate` endpoint returns R1 responses in ~25 seconds

***

### **Week 3-4: Debate Engine (Deliverable: Full R1→R2→Plans)**

**Backend:**
- [ ] LangGraph StateGraph with 10 nodes
- [ ] Conflict detection (embedding similarity)
- [ ] R2 cross-arguing implementation
- [ ] Opinion evolution calculation
- [ ] Arbiter synthesis (Plans A/B/C)

**Frontend:**
- [ ] SSE streaming integration
- [ ] 4 AgentCard components with streaming text
- [ ] Conflict heatmap visualization
- [ ] Plans A/B/C tabs

**Deliverable:** Full debate flow working end-to-end

***

### **Week 5-6: Learning & Polish (Deliverable: Memory + Persian Quality)**

**Backend:**
- [ ] Archival memory search (proactive retrieval)
- [ ] Feedback endpoint (`👍/👎` buttons)
- [ ] Letta self-editing tools integration
- [ ] Memory update node
- [ ] Persian quality guards (detect m-dashes, generic phrases)

**Frontend:**
- [ ] Feedback buttons UI
- [ ] Debate history page
- [ ] Time travel feature (R1 ↔ R2 toggle)
- [ ] Opinion evolution charts
- [ ] RTL fixes + Vazirmatn font

**Deliverable:** System learns from feedback, native Persian feel

***

### **Week 7: Advanced Features (Deliverable: Production-Ready)**

**Backend:**
- [ ] Adversarial critic spawn (conditional edge)
- [ ] Confidence scoring
- [ ] Verification sub-agent
- [ ] LangSmith tracing setup
- [ ] Poly-like debugging

**Frontend:**
- [ ] Confidence badges (high/medium/low)
- [ ] Adversarial critique modal
- [ ] Verification results display
- [ ] Loading states + error handling

**Testing:**
- [ ] 10 PyTest bespoke assertions
- [ ] 10-user private beta
- [ ] Bug fixes from feedback

**Deliverable:** Production-ready system

***

### **Week 8: Deploy & Launch (Deliverable: Live at aieos.ir)**

**Deployment:**
- [ ] Railway backend deploy (Docker + CI/CD)
- [ ] Vercel frontend deploy
- [ ] Custom domain (`aieos.ir`) + SSL
- [ ] Environment variables setup

**Payment & Auth:**
- [ ] ZarrinPal integration
- [ ] Supabase Auth (email/password)
- [ ] Subscription tiers (Personal/Business/Enterprise)

**Documentation:**
- [ ] Swagger API docs
- [ ] Persian user guide
- [ ] Video tutorial (5 min)

**Launch:**
- [ ] 20-user expanded beta
- [ ] Marketing landing page
- [ ] Social media announcement
- [ ] ProductHunt launch

**Deliverable:** Live MVP at https://aieos.ir 🚀

***

## 💰 **REALISTIC BUDGET**

### **Development Phase (Week 1-8):**
- Railway Pro: $20/month × 2 = **$40**
- Supabase Pro: $25/month × 2 = **$50**
- Upstash Redis: $10/month × 2 = **$20**
- Domain + SSL: **$30**
- API Costs (testing):
  - GPT-4o: $50
  - Claude 3.7: $100
  - Gemini 2.0: Free (1,500 req/day)
  - DeepSeek V3: $20
- **Total Dev: $310**

### **Post-Launch (Month 1):**
- Infrastructure: $55/month
- API costs (10 users, 50 debates/day):
  - GPT-4o: $150
  - Claude 3.7: $200
  - DeepSeek V3: $30
- **Total Monthly: $435**

### **Revenue Needed:**
- 5 customers × $25/month = $125 (covers 29% of costs)
- 15 customers × $25/month = $375 (covers 86% of costs)
- **Break-even: 18 customers**

***

## ✅ **FINAL CHECKLIST - ZERO COMPROMISES**

### **Core Features (ALL Included):**
✅ 4 agents + 1 arbiter (Letta V1)  
✅ Parallel R1 execution (LangGraph)  
✅ Cross-critique R2 (agent-to-agent context)  
✅ Conflict detection (embedding similarity 4×4)  
✅ Opinion change tracking (R1 vs R2 distance)  
✅ Adversarial critic spawn (conditional edges)  
✅ Confidence scoring (high/medium/low)  
✅ Verification loops (sub-agent fact-check)  
✅ Consensus scoring (4-factor weighted)  
✅ Plans A/B/C synthesis (Arbiter)  
✅ Perpetual learning (feedback → memory edit)  
✅ Proactive retrieval (archival search)  

### **Infrastructure (Production-Grade):**
✅ Streaming UI (SSE + CopilotKit v1.50)  
✅ RTL Persian (Tailwind + Vazirmatn)  
✅ Persian quality guards (no Claudeisms)  
✅ LangSmith tracing  
✅ Poly-like debugging  
✅ PyTest bespoke tests  
✅ Railway + Vercel deploy  
✅ ZarrinPal payment  
✅ Swagger docs  
✅ Persian user guide  

### **Advanced (State-of-the-Art):**
✅ Memory hygiene (compression)  
✅ Self-editing tools  
✅ Ignore tool pattern  
✅ Tool rules v0.5.2  
✅ lettactl YAML deploy  
✅ Time travel UI  
✅ Opinion evolution charts  
✅ Conflict heatmap  
✅ Consensus gauge  

***

## 🚀 **READY TO START MONDAY DEC 16?**

این **کامل‌ترین** و **بهترین** پلن ممکن است:  
✅ هیچ چیزی حذف نشده  
✅ همه فیچرهای advanced  
✅ بهترین tech stack دسامبر 2025  
✅ واقع‌بینانه‌ترین timeline  
✅ Production-ready از روز اول  

**شروع کنیم؟** 💪🔥
