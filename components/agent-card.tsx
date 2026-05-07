"use client";

import { Play, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Agent, getStatusColor, getStatusLabel } from "@/lib/agents-data";

interface AgentCardProps {
  agent: Agent;
  onUseAgent: (agent: Agent) => void;
}

export function AgentCard({ agent, onUseAgent }: AgentCardProps) {
  return (
    <div
      className={cn(
        "card-stagger group relative overflow-hidden",
        "bg-accent border border-primary/20 rounded-xl p-5",
        "hover:border-primary/50 hover:bg-accent/80",
        "hover:translate-y-[-5px] hover:shadow-card-hover",
        "transition-all duration-300 cursor-pointer",
        "flex flex-col h-full"
      )}
      style={{
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex flex-col flex-1">
        {/* Number */}
        <div className="text-5xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors font-mono mb-2">
          {String(agent.id).padStart(2, "0")}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
          {agent.name}
        </h3>

        {/* Function */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {agent.function}
        </p>

        {/* Status */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              getStatusColor(agent.status),
              agent.status === "online" && "animate-pulse-dot"
            )}
          />
          <span className="text-xs text-muted">{getStatusLabel(agent.status)}</span>
        </div>

        {/* Last execution */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Clock size={12} />
          <span>Última execução: {agent.lastExecutionTime}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUseAgent(agent);
          }}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "bg-primary hover:bg-primary-hover text-foreground font-semibold",
            "py-2.5 px-4 rounded-lg transition-all duration-200",
            "hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]"
          )}
        >
          <Play size={16} fill="currentColor" />
          <span>Usar Agente</span>
        </button>
      </div>
    </div>
  );
}
