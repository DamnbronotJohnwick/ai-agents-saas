"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ListTodo,
  History,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  agents,
  queuedTasks,
  executionHistory,
} from "@/lib/agents-data";

type Tab = "overview" | "queue" | "history" | "settings";

// Format number without locale dependency to avoid hydration mismatch
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeAgents = agents.filter(
    (a) => a.status === "online" || a.status === "working"
  ).length;
  const todayTasks = agents.reduce((acc, a) => acc + a.tasksCompleted, 0);

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "queue", label: "Fila de Tarefas", icon: <ListTodo className="h-4 w-4" /> },
    { id: "history", label: "Historico", icon: <History className="h-4 w-4" /> },
    { id: "settings", label: "Configuracoes", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside className="flex h-[calc(100vh-4rem)] w-80 flex-col border-r border-border bg-sidebar">
      <nav className="flex border-b border-border p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-lg p-2 text-xs transition-colors",
              activeTab === item.id
                ? "bg-accent text-accent-foreground"
                : "text-sidebar-muted hover:bg-accent/50 hover:text-sidebar-foreground"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-medium text-card-foreground">
                Resumo Hoje
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm">Agentes Ativos</span>
                  </div>
                  <span className="text-lg font-semibold text-primary">
                    {activeAgents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Tarefas Completadas</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {mounted ? formatNumber(todayTasks) : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Tempo Medio</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    4.2 min
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-medium text-card-foreground">
                Status dos Agentes
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Online</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {agents.filter((a) => a.status === "online").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Trabalhando</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {agents.filter((a) => a.status === "working").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-zinc-500" />
                    <span className="text-muted-foreground">Offline</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {agents.filter((a) => a.status === "offline").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "queue" && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-sidebar-foreground">
              Tarefas na Fila ({queuedTasks.length})
            </h3>
            {queuedTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-border bg-card p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">
                    #{task.agentNumber} {task.agentName}
                  </span>
                  {task.status === "running" ? (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                  ) : (
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-card-foreground">
                  {task.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.createdAt}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-sidebar-foreground">
              Historico de Execucoes
            </h3>
            {executionHistory.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-border bg-card p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">
                    #{task.agentNumber} {task.agentName}
                  </span>
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-destructive" />
                  )}
                </div>
                <p className="text-sm text-card-foreground">
                  {task.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Concluido {task.completedAt}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-sidebar-foreground">
              Configuracoes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <span className="text-sm text-card-foreground">
                  Notificacoes
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <span className="text-sm text-card-foreground">
                  Integracoes
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <span className="text-sm text-card-foreground">API Keys</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <span className="text-sm text-card-foreground">Conta</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
