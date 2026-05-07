"use client";

import { useState, useEffect } from "react";
import { X, Play, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Agent, getStatusColor, getStatusLabel } from "@/lib/agents-data";

interface AgentModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

type ExecutionState = "idle" | "loading" | "success" | "error";

export function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  const [taskInput, setTaskInput] = useState("");
  const [executionState, setExecutionState] = useState<ExecutionState>("idle");
  const [result, setResult] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setTaskInput("");
        setExecutionState("idle");
        setResult(null);
      }, 200);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleExecute = async () => {
    if (!taskInput.trim() || !agent) return;

    setExecutionState("loading");

    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulate success (80% of the time) or error (20%)
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      setExecutionState("success");
      setResult(
        `Tarefa executada com sucesso pelo agente ${agent.name}!\n\n` +
          `Resumo da execução:\n` +
          `- Tarefa: "${taskInput}"\n` +
          `- Tempo de execução: ${(Math.random() * 3 + 1).toFixed(1)} minutos\n` +
          `- Status: Completado\n\n` +
          `O agente processou sua solicitação e gerou os seguintes resultados:\n\n` +
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n` +
          `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
      );
    } else {
      setExecutionState("error");
      setResult(
        "Ocorreu um erro durante a execução. Por favor, tente novamente ou entre em contato com o suporte."
      );
    }
  };

  const handleRetry = () => {
    setExecutionState("idle");
    setResult(null);
  };

  if (!agent) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "bg-background border border-primary/30 rounded-xl w-full max-w-lg",
            "shadow-[0_0_60px_rgba(255,23,68,0.15)]",
            "pointer-events-auto transition-all duration-300",
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex items-start gap-4">
              <div className="text-5xl font-bold text-primary font-mono">
                {String(agent.id).padStart(2, "0")}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{agent.name}</h2>
                <p className="text-sm text-muted-foreground">{agent.function}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      getStatusColor(agent.status),
                      agent.status === "online" && "animate-pulse-dot"
                    )}
                  />
                  <span className="text-xs text-muted">
                    {getStatusLabel(agent.status)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {executionState === "idle" && (
              <>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                  Descreva a tarefa
                </label>
                <textarea
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder={`Ex: Cria uma landing page para vender Airfryer...`}
                  className="w-full bg-accent border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none h-32 focus:outline-none focus:border-primary transition-colors"
                />
              </>
            )}

            {executionState === "loading" && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={48} className="text-primary animate-spin-slow mb-4" />
                <p className="text-lg font-medium text-foreground">Processando...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  O agente está trabalhando na sua tarefa
                </p>
              </div>
            )}

            {executionState === "success" && result && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-online" />
                  <span className="text-xs uppercase tracking-wider text-online font-medium">
                    Sucesso
                  </span>
                </div>
                <div className="bg-accent border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{result}</p>
                </div>
              </div>
            )}

            {executionState === "error" && result && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-offline" />
                  <span className="text-xs uppercase tracking-wider text-offline font-medium">
                    Erro
                  </span>
                </div>
                <div className="bg-offline/10 border border-offline/30 rounded-lg p-4">
                  <p className="text-sm text-foreground">{result}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-border">
            {executionState === "idle" && (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 border border-foreground/30 text-foreground font-semibold py-3 px-4 rounded-lg hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExecute}
                  disabled={!taskInput.trim()}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2",
                    "bg-primary hover:bg-primary-hover text-foreground font-semibold",
                    "py-3 px-4 rounded-lg transition-all duration-200",
                    "hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  )}
                >
                  <Play size={18} fill="currentColor" />
                  Executar
                </button>
              </>
            )}

            {executionState === "loading" && (
              <button
                onClick={onClose}
                className="w-full border border-foreground/30 text-foreground font-semibold py-3 px-4 rounded-lg hover:bg-foreground hover:text-background transition-all duration-200"
              >
                Executar em Background
              </button>
            )}

            {executionState === "success" && (
              <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary-hover text-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]"
              >
                Fechar
              </button>
            )}

            {executionState === "error" && (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 border border-foreground/30 text-foreground font-semibold py-3 px-4 rounded-lg hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  Fechar
                </button>
                <button
                  onClick={handleRetry}
                  className="flex-1 bg-primary hover:bg-primary-hover text-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]"
                >
                  Tentar Novamente
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
