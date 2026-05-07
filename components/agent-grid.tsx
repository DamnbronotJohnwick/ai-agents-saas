"use client";

import { AgentCard } from "./agent-card";
import { type Agent } from "@/lib/agents-data";
import { cn } from "@/lib/utils";

interface AgentGridProps {
  agents: Agent[];
  onUseAgent: (agent: Agent) => void;
}

export function AgentGrid({ agents, onUseAgent }: AgentGridProps) {
  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-accent border border-border flex items-center justify-center mb-4">
          <span className="text-2xl text-muted-foreground">?</span>
        </div>
        <p className="text-lg font-medium text-foreground mb-1">
          Nenhum agente encontrado
        </p>
        <p className="text-sm text-muted-foreground">
          Tente ajustar os filtros ou a busca
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-5"
      )}
    >
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} onUseAgent={onUseAgent} />
      ))}
    </div>
  );
}
