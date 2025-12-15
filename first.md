# AI EOS Multi-Agent Debate System: 12-Week Architecture Blueprint

**December 2025 Production-Ready Infrastructure Plan**

Building a five-agent expert advisory board system—with GPT-4o (Analyst), Gemini 2.0 Flash (Creative), Claude 3.7 Sonnet (Critic), DeepSeek V3 (Risk), and Claude Arbiter (Synthesizer)—demands a carefully orchestrated architecture combining stateful memory, parallel execution, conflict detection, and consensus algorithms. This blueprint provides the definitive infrastructure roadmap, selecting **Letta for agent memory and personality persistence** combined with **LangGraph for debate orchestration**, supported by **CopilotKit v1.50** for the multi-agent frontend with native Persian RTL support. The total estimated infrastructure cost ranges from **$3,500-8,000/month** at moderate scale, with potential **50-80% savings** through intelligent model routing.

---

## Architecture foundation: why Letta + LangGraph wins

The multi-agent debate system requires two distinct capabilities that no single framework handles optimally: **persistent agent identity with self-editing memory** and **complex workflow orchestration with parallel execution**. Research confirms these frameworks complement each other perfectly.

**Letta (formerly MemGPT)** excels at maintaining agent state across sessions through its three-tier memory hierarchy: Core Memory for in-context persona and opponent models, Conversational Memory for automatic context management, and Archival Memory backed by vector search. Each of the five debater agents maintains persistent identity—the GPT-4o Analyst "remembers" its analytical stance evolution, while the DeepSeek Risk agent accumulates institutional knowledge about risk patterns. Letta's self-editing memory protocol allows agents to update their own memory blocks via tool calls (`memory_replace`, `memory_insert`, `memory_rethink`), enabling genuine learning from debate outcomes without fine-tuning.

**LangGraph** handles what Letta cannot: defining the debate flow as a state machine with parallel execution, conditional branching based on consensus scores, and human-in-the-loop moderation. Its Pregel-inspired execution model runs all five agents simultaneously within synchronized "supersteps," then merges outputs through reducer functions. The `interrupt()` function enables approval workflows for critical decisions. Recent research from Anthropic's multi-agent system demonstrates that parallel execution with 4-6 agents achieves **90.2% performance improvement** over single-agent approaches while cutting research time by up to 90%.

| Component | Framework | Rationale |
|-----------|-----------|-----------|
| Debate flow control | LangGraph | State machine for phases, parallel execution, checkpointing |
| Debater agents (5) | Letta | Persistent identity, self-editing memory, personality |
| Shared debate context | Letta Shared Memory Blocks | Single block attached to multiple agents |
| Argument history | Letta Archival + pgvector | Searchable semantic storage |
| Cross-critique routing | LangGraph Conditional Edges | Dynamic turn management |
| Conflict detection | Custom node in LangGraph | Cosine similarity matrices |
| Consensus building | LangGraph voting node | Majority/supermajority protocols |

---

## Memory architecture: the 25/45/30 token allocation

Based on 2025 best practices and the debate system's unique requirements, memory allocation across a **200K context window** follows this optimized distribution:

**Core Memory (25% - 50K tokens)** contains always-present identity information: agent persona defining debate role and argumentation style (**10K**), debate context block with topic and rules (**10K**), opponent models tracking what each agent knows about the other four (**20K**), and strategy block containing current debate tactics and remaining arguments (**10K**).

**Working Memory (45% - 90K tokens)** handles dynamic session content: recent transcript covering the last 8-10 debate turns (**40K**), RAG-retrieved evidence from archival memory (**30K**), and current turn context including the immediate argument being addressed (**20K**).

**Output Buffer (30% - 60K tokens)** reserves space for extended thinking mode responses, particularly important for Claude 3.7 Sonnet's hybrid reasoning capability that can produce up to **128K output tokens** with configurable thinking budgets.

**Cross-Agent Memory Sharing** uses Letta's shared memory block pattern where a single memory block attaches to all five agents. This enables a shared transcript, common evidence pool, and synchronized scoring criteria without coordination overhead. Each agent maintains private memory for its own strategic reasoning while accessing shared context for debate state.

The **Mem0 two-phase pipeline** pattern applies during memory updates: an extraction phase processes each exchange plus rolling summary to identify candidate memories, followed by an update phase that compares new facts to existing entries, merging or invalidating as needed. This approach achieves **26% higher accuracy** than standard memory with **90% token savings**.

---

## Parallel execution and the AAD debate pattern

Research from multi-agent debate systems reveals that **All-Agents Drafting (AAD)** outperforms sequential patterns by forcing independent reasoning before any agent interaction. The five-agent debate implements this through LangGraph's fan-out/fan-in architecture:

**Phase 1: Parallel Draft Generation** spawns all five agents simultaneously using LangGraph's `Send` API. Each agent receives the debate topic and generates an independent position without seeing others' outputs. This takes approximately **3-8 seconds** depending on model latency (Gemini 2.0 Flash responds fastest at ~6 seconds, GPT-4o at ~20 seconds for complex reasoning).

**Phase 2: Cross-Critique Rounds** implements 2-3 rounds maximum—critical because research shows additional rounds **decrease accuracy** through problem drift. Each round uses round-robin critique assignment where every agent critiques two assigned peers, preventing the common failure mode where agents converge prematurely on plausible-sounding but incorrect consensus.

**Phase 3: Conflict Detection** calculates a **5×5 cosine similarity matrix** using embeddings from the `intfloat/e5-large-v2` model (highest coherence score at 0.498). Pairs with similarity below 0.7 flag as conflicts requiring resolution. The system tracks three key metrics:
- **Agreement Score**: Mean embedding similarity across all agent pairs
- **Divergence Index**: Standard deviation of pairwise similarities  
- **Contradiction Rate**: Percentage of pairs with high similarity but opposing conclusions

**Phase 4: Consensus Building** applies task-appropriate protocols based on Kaesberg et al.'s 2025 research finding that **voting improves reasoning tasks by 13.2%** while **consensus improves knowledge tasks by 2.8%**. For reasoning-heavy debates, the system uses simple voting; for knowledge synthesis, majority consensus with the Claude Arbiter providing confidence-weighted tie-breaking.

---

## The proactive observation phase: learning before debating

Before an agent actively participates, it observes **2-4 debate rounds** to build context—a pattern refined through Letta's Ezra implementation for community support agents. The "ignore tool" pattern allows agents to see every message while deciding whether to respond, ignore, or archive for later reference.

**Observation Protocol Implementation**:

1. **Silent monitoring (Turns 1-3)**: Agent processes all exchanges through its working memory, building opponent models without generating responses. Uses background tasks to retrieve relevant facts from archival memory and map the argumentative structure.

2. **Confidence scoring**: Track readiness across four dimensions—topic comprehension, opponent position mapping, evidence availability, and strategic clarity. Enter debate only when composite confidence exceeds **0.7 threshold**.

3. **Entry preparation**: During observation, draft potential opening positions and identify gaps in other agents' arguments. The first active statement addresses an identified weakness rather than repeating established points.

**Three-tier proactivity** governs ongoing behavior:
- **Hygiene tasks** (automatic, background): Memory consolidation after each turn, evidence retrieval, opponent model updates
- **Suggestions** (await approval): "I've identified a logical fallacy in Agent B's argument—should I address it?"
- **Intelligent intervention** (high-confidence autonomous): Direct rebuttals, fact-checking corrections, moving stalled debates forward

The confidence scoring system borrowed from Google Jules assigns thresholds: actions above **90%** proceed autonomously with notification, **60-90%** suggests with reasoning and awaits approval, below **60%** logs observation and continues watching.

---

## Frontend architecture: CopilotKit v1.50 with Persian RTL

**CopilotKit v1.50** (released December 11, 2025) provides the most comprehensive multi-agent frontend framework through its new `useAgent` hook—a superset of the previous `useCoAgent` enabling independent agent state management. The **AG-UI protocol** streams all agent events (TEXT_MESSAGE_CONTENT, TOOL_CALL_START, STATE_DELTA) as typed JSON over HTTP.

**Multi-Agent Session Management** runs all five debaters in the same UI with independent lifecycles:

```
const { agent: analyst } = useAgent({ agentId: "gpt4o-analyst" });
const { agent: creative } = useAgent({ agentId: "gemini-creative" });
const { agent: critic } = useAgent({ agentId: "claude-critic" });
const { agent: risk } = useAgent({ agentId: "deepseek-risk" });
const { agent: arbiter } = useAgent({ agentId: "claude-arbiter" });
```

**Thread persistence** enables durable, resumable debate sessions with automatic stream reconnection on page reload—critical for multi-hour strategic debates.

**Real-time streaming** uses **Server-Sent Events (SSE)** over WebSocket for most scenarios. SSE wins on scaling (stateless servers), auto-reconnect (built-in with Last-Event-ID), and HTTP infrastructure compatibility. Reserve WebSocket only for bidirectional features like cursor sharing or voice streams. Target **Time-to-First-Token under 300-700ms** using TanStack Query v5's `experimental_streamedQuery` API for optimal perceived performance.

**Debate Visualization Components** implement three views inspired by research tools:
- **Process View**: Timeline showing argument evolution, points introduced/dropped/modified, clash highlighting
- **Strategy View**: Color-coded argument blocks with refutation strategy visualization
- **Conflict Heatmap**: Thomas-Kilmann style 2D quadrant mapping assertiveness vs. cooperativeness, heat intensity showing conflict severity

**Persian RTL Implementation Checklist**:
- Set `dir="rtl"` on root HTML element with `lang="fa"`
- Configure MUI theme with `direction: 'rtl'` and `stylis-plugin-rtl` for Emotion
- Load **Vazirmatn** font from Google Fonts CDN (best web-optimized Persian font)
- Use CSS logical properties (`margin-inline-start` not `margin-left`)
- Test chat bubbles alignment (user right, AI left in RTL)
- Verify Portal components (Dialog, Popover) inherit `dir` attribute
- Handle BiDi text mixing Persian and English numbers correctly

**React 19.2** features enhance the AI experience: the new `<Activity>` component pre-renders hidden agent panels for instant switching, Server Components reduce client JavaScript by **30-50%**, and the production-ready React Compiler eliminates manual memoization overhead with **32% reduction in render cycles** during heavy updates.

---

## Infrastructure stack: PostgreSQL + pgvector as foundation

**Primary Database: PostgreSQL 17 with pgvector extension** emerges as the clear choice for multi-agent debate systems based on benchmark analysis. At high concurrency (typical for 5 parallel agents), pgvector achieves **9.81s average response time** versus ChromaDB's 23.08s, with the lowest standard deviation (3.90s) indicating consistent performance under load. The critical advantage: ACID compliance ensures reliable memory updates when multiple agents modify shared state simultaneously.

**Storage Configuration**:
- Docker image: `pgvector/pgvector:pg17`
- Embedding dimension: 1536 (OpenAI default) or 3072 (text-embedding-3-large)
- Index type: HNSW with `vector_cosine_ops` for similarity search
- Estimated storage: ~57GB per 10M vectors at 1536 dimensions

**Managed Options**: Google Cloud SQL/AlloyDB (pgvector included), Timescale Cloud (adds pgai extensions), or Supabase for rapid deployment.

**Caching Layer: Upstash Redis** provides serverless Redis with two caching strategies:
- **Exact caching**: Store identical query responses, achieving **~100ms** response versus 1-2 seconds uncached
- **Semantic caching** via Upstash Vector: Cache semantically similar queries with configurable similarity threshold (0.7 recommended), reducing API costs by **30-50%** for common debate topics

**LLM Response Caching** integrates through LangChain's `UpstashRedisCache` or custom semantic cache using embedding similarity. Cache invalidation triggers on topic change or after 24-hour TTL.

**Container Orchestration: Kubernetes with KEDA** handles scaling:
- **Base deployment**: 5 agent pods + 1 orchestrator pod + database services
- **Horizontal Pod Autoscaler** scales on CPU utilization (70% target) and custom metrics like `inference_queue_length`
- **KEDA** enables event-driven scaling based on message queue depth
- **Resource allocation per agent**: Light tasks 0.5-1 CPU / 1-2GB RAM; heavy reasoning 2-4 CPU / 4-8GB RAM

**Scaling benchmarks** from production case studies show **40% execution speed improvement** with Kubernetes autoscaling and **30% infrastructure cost reduction** through right-sizing.

---

## LLM provider strategy: cost optimization through intelligent routing

The five-agent configuration spans four providers with dramatically different pricing (December 2025):

| Model | Input $/1M | Output $/1M | Cache Discount | Best For |
|-------|-----------|-------------|----------------|----------|
| DeepSeek V3.2 | $0.28 | $0.42 | 90% on hits | Risk analysis, cost-sensitive tasks |
| GPT-4o | $5.00 | $15.00 | ~75% cached | Complex analysis, primary reasoning |
| Claude 3.7 Sonnet | $3.00 | $15.00 | 50% cached | Critique, extended thinking |
| Gemini 2.0 Flash | $0.15-0.60 | $0.60-3.50 | N/A | Speed-critical creative generation |

**Cost Optimization Strategies**:

1. **Tiered Model Routing** assigns task complexity to appropriate models:
   - Simple classification → DeepSeek V3 (~$0.28/1K calls)
   - Speed-critical creative → Gemini 2.0 Flash
   - Deep reasoning/critique → Claude 3.7 Sonnet with extended thinking
   - Complex synthesis → GPT-4o
   - **Potential savings: 50-80%** versus using premium models for all tasks

2. **Aggressive Prompt Caching** leverages DeepSeek's **90% cache discount** for repeated debate contexts. Store the shared debate prompt, rules, and topic as a cached prefix; append only agent-specific instructions.

3. **Batch Processing** for non-urgent consensus calculations. Queue final synthesis requests for off-peak processing when latency tolerance permits.

4. **Multi-Provider Rate Limit Multiplication**: Load balance across multiple API keys per provider to multiply effective rate limits:

```yaml
strategy: loadbalance
targets:
  - provider: anthropic
    weight: 1
  - provider: anthropic_backup
    weight: 1
```

**Monthly Cost Estimate** at moderate usage (1,000 debates/month, 5 rounds each):
- GPT-4o Analyst: ~$800-1,500
- Gemini Creative: ~$100-300
- Claude Critic: ~$600-1,200
- DeepSeek Risk: ~$50-150
- Claude Arbiter: ~$400-800
- Infrastructure (DB, caching, compute): ~$500-1,000
- **Total: $2,450-4,950/month** before caching optimizations

---

## Testing and observability: LangSmith as command center

**LangSmith** provides the most efficient observability for multi-agent systems with **virtually zero latency overhead** (benchmarked at ~0% versus 12-15% for alternatives). Key capabilities for the debate system:

**Thread-Level Observability** treats multi-turn debates as first-class concepts, providing complete visibility across all exchange rounds. The **Insights Agent** automatically clusters usage patterns, identifying common debate topics and failure modes across millions of traces.

**Multi-Turn Evaluations** score complete debate trajectories rather than individual agent responses:
- Semantic intent alignment with original query
- Outcome quality (did the debate reach useful consensus?)
- Trajectory efficiency (appropriate number of rounds?)

**Testing Pyramid for Agent Systems**:

1. **Unit Tests (fastest, deterministic)**: Use PydanticAI's `TestModel` with `ALLOW_MODEL_REQUESTS=False` to block real API calls. Validate tool execution, memory updates, and state transitions without ML.

2. **Integration Tests (real APIs, traced)**: Run actual debate rounds with LangSmith tracing. Use `pytest-recording` to record/replay HTTP requests for deterministic CI runs.

3. **Evaluation Tests (LLM-as-judge)**: Score debate quality using predefined evaluators for helpfulness, coherence, and hallucination detection. Store traces with feedback as regression test cases.

4. **Multi-Turn Scenario Tests**: Simulate realistic user interactions using the Scenario framework with explicit success/failure criteria.

**CI/CD Pipeline Structure**:
- **Build**: Container images, agent configurations
- **Test (unit)**: Mock models, 30-second timeout, blocks real API calls
- **Test (integration)**: Real APIs on staging, LangSmith traces, 5-minute timeout
- **Quality Gate**: Evaluation pass rate >90%, P95 latency <5s, cost anomaly check
- **Deploy**: Canary with AI verification, progressive rollout, automatic rollback

---

## Security and production hardening

**Human-in-the-Loop Approval** implements three-tier autonomy:
- **Scope 1 (Read-Only)**: Debate agents generate recommendations; humans trigger all external actions
- **Scope 2 (Semi-Autonomous)**: Agents execute debate rounds autonomously; human approval for final action plans
- **Scope 3 (Conditionally Autonomous)**: Full automation with human oversight for exceptions only

**LangGraph's `interrupt()` function** pauses workflow mid-execution for synchronous approval of high-stakes decisions. For better UX, implement Auth0's CIBA pattern for asynchronous authorization via Slack/mobile notifications.

**Circuit Breaker Configuration** per provider:
- Failure threshold: 5 consecutive failures
- Cooldown: 60 seconds before recovery attempt
- Success threshold: 2-3 successful requests to close circuit
- Monitor: HTTP 429, 500, 502, 503, timeouts

**Fallback Chain**:
```
Primary: GPT-4o (lowest latency)
  ↓ Circuit Open
Secondary: Claude 3.7 Sonnet (similar capability)
  ↓ Circuit Open  
Tertiary: Gemini 2.0 Pro (cost-effective)
  ↓ Circuit Open
Emergency: DeepSeek V3 (lowest cost)
  ↓ All Fail
Graceful Degradation: Cached responses / Rule-based fallback
```

**Rate Limiting Strategy**: Token-based limits (not request-based) with multi-level quotas:
- Organization quota: 500K tokens/day
- Team allocation: Production 400K, Development 100K
- Per-agent soft limits with automatic model downgrade on approach

**Privacy and Data Retention**:
- PII detection using AWS Macie or Google DLP API before agent processing
- Tokenization of sensitive data with secure mapping
- Conversation logs: 90-day retention for debugging
- Audit logs: 1-7 years per compliance requirements
- Session isolation: No memory persistence between unrelated user sessions

---

## 12-week implementation roadmap

### Phase 1: Foundation (Weeks 1-3)

**Week 1: Infrastructure Setup**
- Deploy PostgreSQL 17 + pgvector on chosen platform (Cloud SQL recommended for managed operations)
- Configure Upstash Redis for caching layer
- Set up Docker Compose for local development environment
- Establish CI/CD pipeline skeleton with GitHub Actions
- Create API key management for all four LLM providers

*Success Criteria*: Database accepting vector insertions, Redis responding to cache queries, all provider APIs authenticated

**Week 2: Letta Agent Foundation**
- Deploy Letta ADE (Agent Development Environment) for agent prototyping
- Design memory block schema: Persona, Debate Context, Opponent Models, Strategy
- Create agent templates for each of five roles with initial persona definitions
- Implement archival memory schema for debate history storage
- Test self-editing memory protocols with single agent

*Success Criteria*: Single agent maintains memory across sessions, successfully performs memory_replace and archival_memory_search operations

**Week 3: LangGraph Orchestration Skeleton**
- Define state schema (TypedDict) for debate workflow
- Implement basic graph with sequential nodes: topic_input → draft_generation → output
- Add checkpointing with PostgresSaver for state persistence
- Create parallel execution test with two agents
- Implement basic error handling and retry logic

*Success Criteria*: Two agents execute in parallel, state persists across restarts, checkpoint recovery works

---

### Phase 2: Core Debate Engine (Weeks 4-6)

**Week 4: Five-Agent Parallel Execution**
- Extend LangGraph to spawn all five agents using Send API
- Implement fan-out for parallel draft generation
- Create reducer function for merging five agent outputs
- Add synchronization barrier before cross-critique phase
- Configure per-agent timeout handling (longest-running models need graceful degradation)

*Success Criteria*: All five agents generate independent drafts within 30-second window, outputs merge correctly

**Week 5: Cross-Critique Implementation**
- Design critique assignment algorithm (round-robin, 2 critics per agent)
- Implement critique prompt templates for each agent persona
- Add debate round counter with configurable maximum (default: 3)
- Create position tracking for each agent across rounds
- Implement early termination on consensus detection

*Success Criteria*: Complete 3-round debate with critique exchanges, position evolution visible in logs

**Week 6: Conflict Detection and Consensus**
- Integrate embedding model (e5-large-v2) for semantic similarity
- Implement 5×5 cosine similarity matrix calculation
- Create conflict flagging with configurable threshold (0.7 default)
- Implement voting protocol for reasoning tasks
- Implement consensus protocol for knowledge tasks
- Add Claude Arbiter tie-breaking logic with confidence weighting

*Success Criteria*: System correctly identifies conflicts between opposing positions, reaches consensus within 3 rounds

---

### Phase 3: Memory and Learning (Weeks 7-8)

**Week 7: Advanced Memory Implementation**
- Implement shared memory blocks across all five agents
- Create Mem0-style two-phase memory pipeline (extraction + update)
- Add memory compression for older debate rounds
- Implement token budget monitoring and automatic summarization
- Create opponent model update triggers after each round

*Success Criteria*: Agents demonstrate knowledge from previous debates, token usage stays within budget

**Week 8: Feedback Loop and Perpetual Learning**
- Design feedback schema (user corrections, outcome ratings)
- Implement feedback → memory update pipeline
- Create archival memory search for relevant historical debates
- Add personality reinforcement based on positive feedback
- Implement anti-drift mechanisms to prevent persona collapse

*Success Criteria*: User correction successfully updates agent memory, agent behavior reflects correction in subsequent debates

---

### Phase 4: Frontend and Integration (Weeks 9-10)

**Week 9: CopilotKit Multi-Agent UI**
- Set up React 19.2 project with Next.js 15
- Integrate CopilotKit v1.50 with useAgent hooks for all five agents
- Implement SSE streaming with TanStack Query v5 streamedQuery
- Create debate canvas with real-time position updates
- Add conflict heatmap visualization component

*Success Criteria*: All five agents stream responses in parallel to UI, conflict visualization updates in real-time

**Week 10: Persian RTL and Localization**
- Configure MUI RTL theme with stylis-plugin-rtl
- Integrate Vazirmatn font from Google Fonts
- Implement direction context provider
- Test BiDi text handling with mixed Persian/English content
- Localize all UI strings to Persian
- Test keyboard input and RTL scrollbars

*Success Criteria*: Complete debate flow functions correctly in Persian with proper RTL rendering

---

### Phase 5: Production Hardening (Weeks 11-12)

**Week 11: Security and Observability**
- Implement LangSmith tracing across entire debate pipeline
- Create health check endpoints (/health/ready, /health/providers)
- Add circuit breakers per LLM provider
- Implement rate limiting with token-based quotas
- Set up monitoring dashboards (latency, cost, error rate)
- Configure PII detection and redaction pipeline

*Success Criteria*: Full trace visibility in LangSmith, circuit breakers trigger correctly on provider failures

**Week 12: Performance Optimization and Launch**
- Implement prompt caching across all providers
- Add semantic caching for common debate topics
- Optimize cold start times (target: <3 seconds to first response)
- Load test with 10 concurrent debates
- Create runbooks for common failure scenarios
- Final security audit
- Production deployment with canary rollout

*Success Criteria*: P95 latency <10 seconds for complete debate round, handles 10 concurrent debates, no critical security findings

---

## Risk mitigation and deferral recommendations

**Critical Risks and Mitigations**:

1. **Provider rate limits during peak**: Implement aggressive caching, multi-key load balancing, graceful degradation to cheaper models
2. **Memory token overflow**: Monitor budget continuously, trigger automatic summarization at 80% threshold
3. **Consensus failure (agents never agree)**: Cap rounds at 3, force Arbiter decision with disclosed uncertainty
4. **Extended thinking latency**: Set thinking budget caps per agent, implement timeout-based fallback to standard mode

**What to Prioritize**:
- Parallel execution (biggest performance gain)
- Conflict detection (core differentiator)
- Prompt caching (biggest cost reduction)
- LangSmith integration (critical for debugging)

**What to Defer to Phase 2**:
- Voice/audio streaming support
- Advanced visualization dashboards
- Fine-tuned embedding models
- Multi-language beyond Persian
- Mobile-native applications

---

## Success metrics and KPIs

| Metric | Week 6 Target | Week 12 Target |
|--------|---------------|----------------|
| Debate completion rate | 80% | 95% |
| P95 latency (full round) | 20 seconds | 10 seconds |
| Consensus reached rate | 60% | 85% |
| User satisfaction (NPS) | — | >40 |
| Cost per debate | $2.00 | $0.80 |
| Cache hit rate | 20% | 50% |
| System uptime | 95% | 99.5% |

This architecture blueprint provides the foundation for a production-grade multi-agent debate system. The combination of Letta's stateful agent capabilities with LangGraph's orchestration power, backed by CopilotKit's modern frontend framework, creates a system capable of genuine multi-perspective analysis with Persian language excellence. The 12-week timeline balances ambition with pragmatism, delivering core functionality by week 6 while reserving adequate time for the production hardening that distinguishes demos from deployed systems.
