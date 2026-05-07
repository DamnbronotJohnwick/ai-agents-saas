"use client";

import { useState, useMemo, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { StatsCards } from "@/components/stats-cards";
import { Charts } from "@/components/charts";
import { Filters } from "@/components/filters";
import { AgentGrid } from "@/components/agent-grid";
import { AgentModal } from "@/components/agent-modal";
import {
  agents as initialAgents,
  type Agent,
  type AgentCategory,
} from "@/lib/agents-data";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("agents");
  const [isMobile, setIsMobile] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"number" | "name" | "status" | "tasks">("number");
  const [filterCategory, setFilterCategory] = useState<AgentCategory | "all">("all");

  // Dark mode (always dark in this design)
  const [darkMode, setDarkMode] = useState(true);

  // Modal state
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let result = [...initialAgents];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(term) ||
          agent.function.toLowerCase().includes(term) ||
          agent.description.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (filterCategory !== "all") {
      result = result.filter((agent) => agent.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "number":
          return a.id - b.id;
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          const statusOrder = { working: 0, online: 1, offline: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        case "tasks":
          return b.tasksCompleted - a.tasksCompleted;
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterCategory, sortBy]);

  // Calculate stats
  const onlineCount = initialAgents.filter(
    (a) => a.status === "online" || a.status === "working"
  ).length;
  const totalTasks = initialAgents.reduce((sum, a) => sum + a.tasksCompleted, 0);

  const handleUseAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64",
          isMobile && "ml-16"
        )}
      >
        {/* Header */}
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onlineCount={onlineCount}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard de Agentes
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus 30 agentes de IA autônomos
            </p>
          </div>

          {/* Stats */}
          <StatsCards
            activeAgents={onlineCount}
            totalTasks={totalTasks}
            avgTime={4.2}
          />

          {/* Charts */}
          <Charts />

          {/* Filters */}
          <Filters
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
          />

          {/* Agent Grid */}
          <AgentGrid agents={filteredAgents} onUseAgent={handleUseAgent} />

          {/* Footer Info */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Todos os 30 agentes estão prontos para trabalhar. Clique em qualquer
              um para começar.
            </p>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AgentModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
