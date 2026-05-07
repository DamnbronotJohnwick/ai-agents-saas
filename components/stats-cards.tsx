"use client";

import { Bot, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  activeAgents: number;
  totalTasks: number;
  avgTime: number;
}

export function StatsCards({ activeAgents, totalTasks, avgTime }: StatsCardsProps) {
  const stats = [
    {
      label: "Agentes Ativos",
      value: activeAgents,
      icon: Bot,
      suffix: "",
    },
    {
      label: "Tarefas Completadas",
      value: totalTasks.toLocaleString("pt-BR"),
      icon: CheckCircle,
      suffix: "",
    },
    {
      label: "Tempo Médio",
      value: avgTime.toFixed(1),
      icon: Clock,
      suffix: " min",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={cn(
              "relative overflow-hidden bg-accent border border-border rounded-xl p-6",
              "hover:border-border-light transition-all duration-300",
              "hover:translate-y-[-2px] hover:shadow-card"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={18} className="text-muted-foreground" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
              <p className="text-4xl font-bold text-foreground">
                <span className="text-primary font-mono">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-foreground text-2xl">{stat.suffix}</span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
