"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { StreamState, Agent, AgentStep } from "@/types"

const STAGE_NAMES: Record<string, { name: string; nameEn: string }> = {
  "query-analysis": { name: "درک سؤال", nameEn: "Query Analysis" },
  "memory-search": { name: "جستجوی حافظه", nameEn: "Memory Search" },
  "agent-activation": { name: "فعال‌سازی نمایندگان", nameEn: "Agent Activation" },
  "debate-round-1": { name: "دور اول مناظره", nameEn: "Debate Round 1" },
  calibration: { name: "کالیبراسیون", nameEn: "Calibration" },
  "debate-round-2": { name: "دور دوم مناظره", nameEn: "Debate Round 2" },
  synthesis: { name: "ترکیب نهایی", nameEn: "Synthesis" },
}

const createInitialAgents = (): Agent[] => [
  {
    id: "analyst",
    name: "تحلیلگر داده‌محور",
    nameEn: "Data Analyst",
    model: "GPT-4o",
    icon: "BarChart3",
    color: "analyst",
    status: "idle",
    confidence: 0,
    steps: [],
    tokens: 0,
  },
  {
    id: "strategist",
    name: "استراتژیست خلاق",
    nameEn: "Creative Strategist",
    model: "Claude Sonnet",
    icon: "Lightbulb",
    color: "strategist",
    status: "idle",
    confidence: 0,
    steps: [],
    tokens: 0,
  },
  {
    id: "critic",
    name: "منتقد ریسک",
    nameEn: "Risk Critic",
    model: "Gemini Pro",
    icon: "Shield",
    color: "critic",
    status: "idle",
    confidence: 0,
    steps: [],
    tokens: 0,
  },
]

export function useStreaming() {
  const [state, setState] = useState<StreamState>({
    isStreaming: false,
    isPaused: false,
    currentStage: "",
    stages: [],
    rounds: [],
    totalTokens: 0,
    totalCost: 0,
    elapsedTime: 0,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const stepIndexRef = useRef(0)
  const startTimeRef = useRef(0)

  const simulateStep = useCallback(() => {
    setState((prev) => {
      if (prev.isPaused) return prev

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const newState = { ...prev, elapsedTime: elapsed }

      // Simulation logic based on elapsed time
      if (elapsed < 0.5) {
        // Query analysis
        if (newState.currentStage !== "query-analysis") {
          newState.currentStage = "query-analysis"
          newState.stages = [
            {
              id: "query-analysis",
              ...STAGE_NAMES["query-analysis"],
              status: "running",
              startTime: elapsed,
            },
          ]
        }
      } else if (elapsed < 1.2) {
        // Memory search
        if (newState.currentStage !== "memory-search") {
          newState.stages = newState.stages.map((s) =>
            s.id === "query-analysis" ? { ...s, status: "complete", endTime: elapsed } : s,
          )
          newState.stages.push({
            id: "memory-search",
            ...STAGE_NAMES["memory-search"],
            status: "running",
            startTime: elapsed,
          })
          newState.currentStage = "memory-search"
        }
      } else if (elapsed < 6) {
        // Agent activation and work
        if (newState.currentStage !== "agent-activation") {
          newState.stages = newState.stages.map((s) =>
            s.id === "memory-search" ? { ...s, status: "complete", endTime: elapsed } : s,
          )
          newState.stages.push({
            id: "agent-activation",
            ...STAGE_NAMES["agent-activation"],
            status: "running",
            startTime: elapsed,
          })
          newState.currentStage = "agent-activation"

          // Initialize round 1
          newState.rounds = [
            {
              id: "round-1",
              number: 1,
              agents: createInitialAgents().map((a) => ({ ...a, status: "thinking" as const })),
              consensus: 0,
              complete: false,
            },
          ]
        }

        // Update agent progress
        const agentProgress = Math.min((elapsed - 1.2) / 4.8, 1)
        if (newState.rounds.length > 0) {
          newState.rounds = newState.rounds.map((round) => ({
            ...round,
            agents: round.agents.map((agent, idx) => {
              const agentDelay = idx * 0.3
              const agentElapsed = Math.max(0, agentProgress - agentDelay / 4.8)
              const steps: AgentStep[] = []

              if (agentElapsed > 0) {
                steps.push({
                  id: "1",
                  time: 0.2 + agentDelay,
                  type: "thinking",
                  message: "بارگذاری context...",
                  status: "complete",
                })
              }
              if (agentElapsed > 0.2) {
                steps.push({
                  id: "2",
                  time: 0.5 + agentDelay,
                  type: "tool",
                  message: "جستجوی وب",
                  toolName: "web_search",
                  toolInput: "بازار دبی ۲۰۲۵",
                  status: agentElapsed > 0.4 ? "complete" : "running",
                  toolOutput: agentElapsed > 0.4 ? "۵ منبع یافت شد" : undefined,
                })
              }
              if (agentElapsed > 0.5) {
                steps.push({
                  id: "3",
                  time: 1.2 + agentDelay,
                  type: "thinking",
                  message: "تحلیل داده‌ها...",
                  status: agentElapsed > 0.7 ? "complete" : "running",
                  progress: Math.min(((agentElapsed - 0.5) / 0.2) * 100, 100),
                })
              }
              if (agentElapsed > 0.8) {
                steps.push({
                  id: "4",
                  time: 2.5 + agentDelay,
                  type: "output",
                  message: "نوشتن خروجی...",
                  status: agentElapsed > 0.95 ? "complete" : "running",
                  progress: Math.min(((agentElapsed - 0.8) / 0.15) * 100, 100),
                })
              }

              return {
                ...agent,
                status: agentElapsed >= 1 ? "complete" : agentElapsed > 0 ? "working" : "thinking",
                confidence: Math.min(agentElapsed * 90 + Math.random() * 10, 95),
                steps,
                tokens: Math.floor(agentElapsed * 800),
              }
            }),
          }))
        }

        newState.totalTokens = Math.floor(agentProgress * 2400)
        newState.totalCost = agentProgress * 0.035
      } else if (elapsed < 7) {
        // Calibration
        if (newState.currentStage !== "calibration") {
          newState.stages = newState.stages.map((s) =>
            s.id === "agent-activation" ? { ...s, status: "complete", endTime: elapsed } : s,
          )
          newState.stages.push({
            id: "calibration",
            ...STAGE_NAMES["calibration"],
            status: "running",
            startTime: elapsed,
          })
          newState.currentStage = "calibration"

          if (newState.rounds.length > 0) {
            newState.rounds[0].complete = true
            newState.rounds[0].consensus = 68
          }
        }
      } else if (elapsed < 8.5) {
        // Synthesis
        if (newState.currentStage !== "synthesis") {
          newState.stages = newState.stages.map((s) =>
            s.id === "calibration" ? { ...s, status: "complete", endTime: elapsed } : s,
          )
          newState.stages.push({
            id: "synthesis",
            ...STAGE_NAMES["synthesis"],
            status: "running",
            startTime: elapsed,
          })
          newState.currentStage = "synthesis"
        }
      } else {
        // Complete
        newState.stages = newState.stages.map((s) =>
          s.id === "synthesis" ? { ...s, status: "complete", endTime: elapsed } : s,
        )
        newState.isStreaming = false
        newState.totalTokens = 3200
        newState.totalCost = 0.042

        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }

      return newState
    })
  }, [])

  const startStreaming = useCallback(() => {
    startTimeRef.current = Date.now()
    stepIndexRef.current = 0

    setState({
      isStreaming: true,
      isPaused: false,
      currentStage: "",
      stages: [],
      rounds: [],
      totalTokens: 0,
      totalCost: 0,
      elapsedTime: 0,
    })

    intervalRef.current = setInterval(simulateStep, 100)
  }, [simulateStep])

  const pauseStreaming = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }))
  }, [])

  const resumeStreaming = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }))
  }, [])

  const cancelStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState((prev) => ({
      ...prev,
      isStreaming: false,
      isPaused: false,
    }))
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    state,
    startStreaming,
    pauseStreaming,
    resumeStreaming,
    cancelStreaming,
  }
}
