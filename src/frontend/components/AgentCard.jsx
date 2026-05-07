import React, { useState } from "react";
import { useAgentExecutor } from "../hooks/useAgentExecutor";

const AgentCard = ({ agent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const { executeAgent, loading, result, error } = useAgentExecutor();

  const handleExecute = async () => {
    if (!taskInput.trim()) {
      alert("Digite uma tarefa!");
      return;
    }

    try {
      const res = await executeAgent(agent.number, taskInput);
      alert(`✅ Agente ${agent.name} completou!\n\n${res.result}`);
      setTaskInput("");
      setIsModalOpen(false);
    } catch (err) {
      alert(`❌ Erro: ${error}`);
    }
  };

  return (
    <>
      {/* Card */}
      <div className="bg-[#1A1F3A] border border-[#FF1744] rounded-xl p-6 hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer group">
        {/* Número Grande Vermelho */}
        <div className="text-6xl font-bold text-[#FF1744] mb-4 opacity-40 group-hover:opacity-100 transition">
          {agent.number}
        </div>

        {/* Nome */}
        <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>

        {/* Função */}
        <p className="text-sm text-gray-400 mb-4">{agent.function}</p>

        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-300">Online</span>
        </div>

        {/* Último Tempo */}
        <p className="text-xs text-gray-500 mb-6">
          Última execução: há 2 horas
        </p>

        {/* Botão */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#FF1744] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          ▶ Usar Agente
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0E27] border border-[#FF1744] rounded-xl p-8 w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-5xl font-bold text-[#FF1744]">
                  {agent.number}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {agent.name}
                </h2>
                <p className="text-sm text-gray-400">{agent.function}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Input */}
            {!result && !error && (
              <>
                <label className="block text-sm uppercase text-gray-400 mb-3">
                  Descreva a tarefa
                </label>
                <textarea
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder={`Ex: Cria uma landing page para vender Airfryrer...`}
                  className="w-full bg-[#1A1F3A] border border-[#2A3050] rounded-lg p-4 text-white placeholder-gray-500 resize-none h-32 mb-6 focus:outline-none focus:border-[#FF1744]"
                />

                {/* Botões */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-white text-white font-bold py-3 px-4 rounded-lg hover:bg-white hover:text-black transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleExecute}
                    disabled={loading}
                    className="flex-1 bg-[#FF1744] hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⚙️</span> Processando
                      </>
                    ) : (
                      <>▶ Executar</>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Result */}
            {result && !error && (
              <div className="mb-6">
                <p className="text-xs uppercase text-green-400 mb-3">
                  ✅ Sucesso
                </p>
                <div className="bg-[#1A1F3A] border border-[#2A3050] rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-white text-sm whitespace-pre-wrap">
                    {typeof result.result === "string"
                      ? result.result
                      : JSON.stringify(result.result, null, 2)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setResult(null);
                    setTaskInput("");
                    setIsModalOpen(false);
                  }}
                  className="w-full mt-4 bg-[#FF1744] text-white font-bold py-3 px-4 rounded-lg"
                >
                  Fechar
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6">
                <p className="text-xs uppercase text-red-400 mb-3">❌ Erro</p>
                <div className="bg-red-950 border border-red-700 rounded-lg p-4">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
                <button
                  onClick={() => {
                    setError(null);
                    setTaskInput("");
                  }}
                  className="w-full mt-4 border border-white text-white font-bold py-3 px-4 rounded-lg"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentCard;
