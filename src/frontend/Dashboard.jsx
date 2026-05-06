import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import {
  Bot,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Play,
  Search,
  Filter,
  LayoutGrid,
  List,
  Sun,
  Moon,
  Bell,
  Settings,
  History,
  ListTodo,
  BarChart3,
  X,
} from "lucide-react";

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// API base URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Agent data - 30 agents
const agentsData = [
  { id: 1, name: "CEO Agent", role: "Chief Executive", status: "online", lastRun: "2min", tasksCompleted: 847 },
  { id: 2, name: "COO Agent", role: "Chief Operations", status: "working", lastRun: "Agora", tasksCompleted: 623 },
  { id: 3, name: "CFO Agent", role: "Chief Financial", status: "online", lastRun: "5min", tasksCompleted: 512 },
  { id: 4, name: "CTO Agent", role: "Chief Technology", status: "working", lastRun: "Agora", tasksCompleted: 934 },
  { id: 5, name: "CMO Agent", role: "Chief Marketing", status: "online", lastRun: "12min", tasksCompleted: 445 },
  { id: 6, name: "Copy Agent", role: "Copywriting", status: "online", lastRun: "3min", tasksCompleted: 1203 },
  { id: 7, name: "Marketing Agent", role: "Marketing Digital", status: "working", lastRun: "Agora", tasksCompleted: 892 },
  { id: 8, name: "Sales Agent", role: "Vendas", status: "online", lastRun: "8min", tasksCompleted: 567 },
  { id: 9, name: "Support Agent", role: "Suporte ao Cliente", status: "offline", lastRun: "2h", tasksCompleted: 1456 },
  { id: 10, name: "HR Agent", role: "Recursos Humanos", status: "online", lastRun: "15min", tasksCompleted: 234 },
  { id: 11, name: "Legal Agent", role: "Juridico", status: "offline", lastRun: "1h", tasksCompleted: 123 },
  { id: 12, name: "Analytics Agent", role: "Analise de Dados", status: "working", lastRun: "Agora", tasksCompleted: 789 },
  { id: 13, name: "Content Agent", role: "Criacao de Conteudo", status: "online", lastRun: "6min", tasksCompleted: 1034 },
  { id: 14, name: "SEO Agent", role: "Otimizacao SEO", status: "online", lastRun: "20min", tasksCompleted: 456 },
  { id: 15, name: "Social Agent", role: "Redes Sociais", status: "working", lastRun: "Agora", tasksCompleted: 678 },
  { id: 16, name: "Email Agent", role: "Email Marketing", status: "online", lastRun: "4min", tasksCompleted: 890 },
  { id: 17, name: "Design Agent", role: "Design Grafico", status: "offline", lastRun: "3h", tasksCompleted: 345 },
  { id: 18, name: "Video Agent", role: "Producao de Video", status: "online", lastRun: "30min", tasksCompleted: 123 },
  { id: 19, name: "Audio Agent", role: "Producao de Audio", status: "offline", lastRun: "5h", tasksCompleted: 89 },
  { id: 20, name: "Research Agent", role: "Pesquisa de Mercado", status: "working", lastRun: "Agora", tasksCompleted: 567 },
  { id: 21, name: "Strategy Agent", role: "Estrategia", status: "online", lastRun: "10min", tasksCompleted: 234 },
  { id: 22, name: "Product Agent", role: "Gestao de Produto", status: "online", lastRun: "7min", tasksCompleted: 456 },
  { id: 23, name: "Project Agent", role: "Gestao de Projetos", status: "working", lastRun: "Agora", tasksCompleted: 678 },
  { id: 24, name: "QA Agent", role: "Qualidade", status: "online", lastRun: "25min", tasksCompleted: 345 },
  { id: 25, name: "DevOps Agent", role: "Infraestrutura", status: "offline", lastRun: "4h", tasksCompleted: 234 },
  { id: 26, name: "Security Agent", role: "Seguranca", status: "online", lastRun: "45min", tasksCompleted: 167 },
  { id: 27, name: "Training Agent", role: "Treinamento", status: "online", lastRun: "1h", tasksCompleted: 289 },
  { id: 28, name: "Onboarding Agent", role: "Integracao", status: "working", lastRun: "Agora", tasksCompleted: 412 },
  { id: 29, name: "Feedback Agent", role: "Coleta de Feedback", status: "online", lastRun: "35min", tasksCompleted: 534 },
  { id: 30, name: "Report Agent", role: "Relatorios", status: "online", lastRun: "18min", tasksCompleted: 723 },
];

export default function Dashboard() {
  const [agents, setAgents] = useState(agentsData);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // Fetch user from Supabase on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to use an agent
  const useAgent = async (agentNumber, task, context = {}) => {
    try {
      const response = await axios.post(
        `${API_BASE}/agent/${agentNumber}/execute`,
        {
          company_id: user?.user_metadata?.company_id || user?.id,
          task_description: task,
          context: context,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao usar agente:", error);
      throw error;
    }
  };

  // Handle agent execution
  const handleExecuteAgent = async () => {
    if (!selectedAgent || !taskDescription.trim()) return;

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const result = await useAgent(selectedAgent.id, taskDescription, {
        agentName: selectedAgent.name,
        agentRole: selectedAgent.role,
      });
      setExecutionResult({ success: true, data: result });
      
      // Update agent status
      setAgents(prev => prev.map(a => 
        a.id === selectedAgent.id 
          ? { ...a, status: "working", lastRun: "Agora", tasksCompleted: a.tasksCompleted + 1 }
          : a
      ));
    } catch (error) {
      setExecutionResult({ 
        success: false, 
        error: error.response?.data?.message || error.message || "Erro ao executar agente" 
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedAgent(null);
    setTaskDescription("");
    setExecutionResult(null);
  };

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const activeAgents = agents.filter(a => a.status === "online" || a.status === "working").length;
  const workingAgents = agents.filter(a => a.status === "working").length;
  const totalTasks = agents.reduce((acc, a) => acc + a.tasksCompleted, 0);

  // Status badge styles
  const getStatusBadge = (status) => {
    const styles = {
      online: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      working: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      offline: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
    };
    const labels = { online: "Online", working: "Trabalhando", offline: "Offline" };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "bg-emerald-400" : status === "working" ? "bg-blue-400 animate-pulse" : "bg-zinc-400"}`} />
        {labels[status]}
      </span>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AI Agents</h1>
              <p className="text-xs text-zinc-500">Painel de Controle</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">{activeAgents} ativos</span>
              <span className="text-zinc-500">|</span>
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="text-sm font-medium">{workingAgents} trabalhando</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-zinc-400" /> : <Moon className="w-5 h-5 text-zinc-400" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-zinc-800 bg-zinc-950">
          <nav className="p-4">
            <div className="space-y-1">
              {[
                { id: "overview", icon: BarChart3, label: "Overview" },
                { id: "queue", icon: ListTodo, label: "Fila de Tarefas" },
                { id: "history", icon: History, label: "Historico" },
                { id: "settings", icon: Settings, label: "Configuracoes" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-violet-600/20 text-violet-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Stats */}
          <div className="p-4 border-t border-zinc-800">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  TAREFAS HOJE
                </div>
                <span className="text-2xl font-bold text-white">
                  {totalTasks.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-2">
                  <Clock className="w-4 h-4" />
                  TEMPO MEDIO
                </div>
                <span className="text-2xl font-bold text-white">2.4s</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar agente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
                {["all", "online", "working", "offline"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? "bg-violet-600 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {status === "all" ? "Todos" : status === "online" ? "Online" : status === "working" ? "Trabalhando" : "Offline"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Agents Grid */}
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
            : "space-y-3"
          }>
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className={`group relative p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-all ${
                  viewMode === "list" ? "flex items-center justify-between" : ""
                }`}
              >
                <div className={viewMode === "list" ? "flex items-center gap-4" : ""}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-500">#{String(agent.id).padStart(2, "0")}</span>
                    {getStatusBadge(agent.status)}
                  </div>
                  <div className={viewMode === "list" ? "" : "mb-4"}>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-sm text-zinc-500">{agent.role}</p>
                  </div>
                  <div className={`flex items-center gap-4 text-xs text-zinc-500 ${viewMode === "list" ? "" : "mb-4"}`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {agent.lastRun}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {agent.tasksCompleted}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(agent)}
                  disabled={agent.status === "offline"}
                  className={`${viewMode === "list" ? "" : "w-full"} flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    agent.status === "offline"
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-500 text-white"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Usar Agente
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedAgent.name}</h2>
                  <p className="text-sm text-zinc-500">{selectedAgent.role}</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {!executionResult ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Descreva a tarefa
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Ex: Analise o relatorio de vendas do ultimo mes..."
                    rows={4}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>
                <button
                  onClick={handleExecuteAgent}
                  disabled={isExecuting || !taskDescription.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium transition-colors"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Executando...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Executar Tarefa
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className={`p-4 rounded-lg border ${
                executionResult.success 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-red-500/10 border-red-500/30"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {executionResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className={`font-medium ${executionResult.success ? "text-emerald-400" : "text-red-400"}`}>
                    {executionResult.success ? "Tarefa executada com sucesso!" : "Erro na execucao"}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">
                  {executionResult.success 
                    ? JSON.stringify(executionResult.data, null, 2)
                    : executionResult.error
                  }
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
