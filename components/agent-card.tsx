"use client";

import { useState } from "react";
import { Clock, Play, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgent } from "@/lib/api";
import type { Agent } from "@/lib/agents-data";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

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

  const handleUseAgent = () => {
    if (agent.status !== "offline") {
      setIsModalOpen(true);
      setResult(null);
    }
  };

  const handleExecute = async () => {
    if (!taskDescription.trim()) return;

    setIsExecuting(true);
    setResult(null);

    try {
      // Usando um company_id placeholder - em produção viria do contexto do usuário
      const response = await useAgent(
        agent.number,
        taskDescription,
        "demo-company-id",
        {}
      );

      if (response?.success) {
        setResult(`Tarefa iniciada com sucesso! ID: ${response.taskId}`);
      } else {
        setResult(`Erro: ${response?.error || "Falha ao executar agente"}`);
      }
    } catch {
      setResult("Erro de conexão com o servidor. Verifique se a API está disponível.");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskDescription("");
    setResult(null);
  };

  return (
    <>
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
            onClick={handleUseAgent}
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

      {/* Modal para executar agente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                  {agent.number.toString().padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {agent.function}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-card-foreground">
                Descreva a tarefa
              </label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Ex: Analise os dados de vendas do último trimestre..."
                className="h-28 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isExecuting}
              />
            </div>

            {result && (
              <div
                className={cn(
                  "mb-4 rounded-lg p-3 text-sm",
                  result.startsWith("Erro")
                    ? "bg-red-500/10 text-red-500"
                    : "bg-green-500/10 text-green-500"
                )}
              >
                {result}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-lg border border-border bg-card py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
                disabled={isExecuting}
              >
                Cancelar
              </button>
              <button
                onClick={handleExecute}
                disabled={!taskDescription.trim() || isExecuting}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors",
                  !taskDescription.trim() || isExecuting
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Executando...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Executar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
