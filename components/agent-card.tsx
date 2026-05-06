"use client";

import { Clock, Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/lib/agents-data";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      text: "Online",
      textColor: "text-green-500",
    },
    offline: {
      color: "bg-zinc-500",
      text: "Offline",
      textColor: "text-zinc-500",
    },
    working: {
      color: "bg-blue-500",
      text: "Trabalhando",
      textColor: "text-blue-500",
    },
  };

  const status = statusConfig[agent.status];

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
            {agent.number.toString().padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                status.color,
                agent.status === "working" && "animate-pulse"
              )}
            />
            <span className={cn("text-xs font-medium", status.textColor)}>
              {status.text}
            </span>
          </div>
        </div>
        {agent.status === "working" && (
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        )}
      </div>

      <h3 className="mb-1 text-sm font-semibold text-card-foreground">
        {agent.name}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">{agent.function}</p>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{agent.lastExecutionTime}</span>
        </div>
        <button
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            agent.status === "offline"
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          disabled={agent.status === "offline"}
        >
          <Play className="h-3 w-3" />
          Usar agente
        </button>
      </div>
    </div>
  );
}
