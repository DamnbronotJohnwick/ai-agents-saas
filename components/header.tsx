"use client";

import { Bot, Activity, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { agents } from "@/lib/agents-data";

export function Header() {
  const activeAgents = agents.filter(
    (a) => a.status === "online" || a.status === "working"
  ).length;
  const workingAgents = agents.filter((a) => a.status === "working").length;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Agents</h1>
          <p className="text-xs text-muted-foreground">Central de Comando</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-1.5">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {activeAgents} ativos
            </span>
            <span className="text-xs text-muted-foreground">
              ({workingAgents} trabalhando)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
          </button>
          <ThemeToggle />
          <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
