import React, { useState, useMemo } from "react";
import AgentCard from "./AgentCard";
import agentsConfig from "../../config/agents-config.json";

const AgentGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("number");

  // Filtra e ordena agentes
  const filteredAgents = useMemo(() => {
    let agents = [...agentsConfig.agents];

    // Busca
    if (searchTerm) {
      agents = agents.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.function.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filterType !== "all") {
      agents = agents.filter((a) => a.agent_function === filterType);
    }

    // Sort
    agents.sort((a, b) => {
      if (sortBy === "number") return a.number - b.number;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return agents;
  }, [searchTerm, filterType, sortBy]);

  return (
    <div className="min-h-screen bg-[#0A0E27] p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-2">
          AI <span className="text-[#FF1744]">Agents</span>
        </h1>
        <p className="text-gray-400">
          30 agentes autônomos trabalhando para seu negócio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1A1F3A] border border-[#2A3050] rounded-xl p-6">
          <p className="text-gray-400 text-sm uppercase mb-2">Agentes Ativos</p>
          <p className="text-4xl font-bold text-white">
            <span className="text-[#FF1744]">25</span>
          </p>
        </div>
        <div className="bg-[#1A1F3A] border border-[#2A3050] rounded-xl p-6">
          <p className="text-gray-400 text-sm uppercase mb-2">
            Tarefas Completadas
          </p>
          <p className="text-4xl font-bold text-white">
            <span className="text-[#FF1744]">5,487</span>
          </p>
        </div>
        <div className="bg-[#1A1F3A] border border-[#2A3050] rounded-xl p-6">
          <p className="text-gray-400 text-sm uppercase mb-2">Tempo Médio</p>
          <p className="text-4xl font-bold text-white">
            <span className="text-[#FF1744]">4.2</span> min
          </p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="🔍 Buscar agentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[250px] bg-[#1A1F3A] border border-[#2A3050] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF1744]"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#1A1F3A] border border-[#2A3050] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF1744]"
        >
          <option value="number">Por Número</option>
          <option value="name">Por Nome</option>
        </select>

        <button className="bg-[#FF1744] hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition">
          Deploy →
        </button>
      </div>

      {/* Grid de Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.number} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Nenhum agente encontrado</p>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-16 border-t border-[#2A3050] pt-8 text-center text-gray-500 text-sm">
        <p>
          🚀 Todos os 30 agentes estão prontos para trabalhar. Clique em
          qualquer um para começar.
        </p>
      </div>
    </div>
  );
};

export default AgentGrid;
