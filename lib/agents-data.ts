export type AgentStatus = "online" | "offline" | "working";

export interface Agent {
  number: number;
  name: string;
  function: string;
  description: string;
  status: AgentStatus;
  lastExecutionTime: string;
  tasksCompleted: number;
}

export interface Task {
  id: string;
  agentNumber: number;
  agentName: string;
  description: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
}

export const agents: Agent[] = [
  { number: 1, name: "CEO Assistant", function: "CEO/Visao Estrategica", description: "Analise estrategica, decisoes executivas", status: "online", lastExecutionTime: "2m", tasksCompleted: 145 },
  { number: 2, name: "CEO Reviewer", function: "Revisor de Qualidade", description: "Verifica erros, melhora qualidade", status: "working", lastExecutionTime: "1m", tasksCompleted: 89 },
  { number: 3, name: "COO Manager", function: "Operacoes e Processos", description: "Gerencia operacoes, timeline", status: "online", lastExecutionTime: "5m", tasksCompleted: 234 },
  { number: 4, name: "CFO Manager", function: "Financas e Numeros", description: "Analise financeira, ROI", status: "offline", lastExecutionTime: "1h", tasksCompleted: 67 },
  { number: 5, name: "Copy Master", function: "Copywriting", description: "Textos de venda, headlines", status: "working", lastExecutionTime: "30s", tasksCompleted: 412 },
  { number: 6, name: "Email Sequence", function: "Sequencias de Email", description: "Campanhas de email", status: "online", lastExecutionTime: "15m", tasksCompleted: 78 },
  { number: 7, name: "Social Media Master", function: "Marketing Social", description: "Posts e strategies", status: "working", lastExecutionTime: "45s", tasksCompleted: 523 },
  { number: 8, name: "Content Writer", function: "Criacao de Conteudo", description: "Blogs, artigos, guias", status: "online", lastExecutionTime: "8m", tasksCompleted: 189 },
  { number: 9, name: "SEO Specialist", function: "SEO e Otimizacao", description: "Keywords, rankings", status: "online", lastExecutionTime: "20m", tasksCompleted: 156 },
  { number: 10, name: "PPC Ads Manager", function: "Anuncios Pagos", description: "Google/Facebook Ads", status: "offline", lastExecutionTime: "2h", tasksCompleted: 43 },
  { number: 11, name: "Customer Service", function: "Suporte ao Cliente", description: "Tickets, atendimento", status: "working", lastExecutionTime: "10s", tasksCompleted: 892 },
  { number: 12, name: "Sales Closer", function: "Fechamento de Vendas", description: "Follow up, negociacao", status: "online", lastExecutionTime: "12m", tasksCompleted: 67 },
  { number: 13, name: "Lead Qualifier", function: "Qualificacao de Leads", description: "Avaliacao Tier A/B/C", status: "online", lastExecutionTime: "3m", tasksCompleted: 234 },
  { number: 14, name: "Market Researcher", function: "Pesquisa de Mercado", description: "Analise competitiva", status: "offline", lastExecutionTime: "4h", tasksCompleted: 28 },
  { number: 15, name: "Product Manager", function: "Gestao de Produto", description: "Features, roadmap", status: "online", lastExecutionTime: "25m", tasksCompleted: 112 },
  { number: 16, name: "UI/UX Designer", function: "Design de Interface", description: "Layouts, prototypes", status: "working", lastExecutionTime: "2m", tasksCompleted: 178 },
  { number: 17, name: "Frontend Developer", function: "Desenvolvimento Front", description: "React, Vue, HTML/CSS", status: "working", lastExecutionTime: "1m", tasksCompleted: 345 },
  { number: 18, name: "Backend Developer", function: "Desenvolvimento Back", description: "APIs, databases", status: "online", lastExecutionTime: "7m", tasksCompleted: 267 },
  { number: 19, name: "DevOps Engineer", function: "Infraestrutura", description: "Deploy, CI/CD", status: "online", lastExecutionTime: "30m", tasksCompleted: 89 },
  { number: 20, name: "Database Admin", function: "Administracao de Dados", description: "Queries, backups", status: "offline", lastExecutionTime: "6h", tasksCompleted: 34 },
  { number: 21, name: "Security Officer", function: "Seguranca", description: "GDPR, compliance", status: "online", lastExecutionTime: "45m", tasksCompleted: 56 },
  { number: 22, name: "Brand Strategist", function: "Estrategia de Marca", description: "Identity, positioning", status: "online", lastExecutionTime: "1h", tasksCompleted: 45 },
  { number: 23, name: "Video Creator", function: "Producao de Video", description: "Roteiros, edicao", status: "working", lastExecutionTime: "5m", tasksCompleted: 134 },
  { number: 24, name: "Graphic Designer", function: "Design Grafico", description: "Banners, posts", status: "online", lastExecutionTime: "18m", tasksCompleted: 289 },
  { number: 25, name: "Website Builder", function: "Criacao de Sites", description: "Landing pages", status: "online", lastExecutionTime: "40m", tasksCompleted: 67 },
  { number: 26, name: "Ecommerce Expert", function: "Otimizacao Ecommerce", description: "Conversao, checkout", status: "offline", lastExecutionTime: "3h", tasksCompleted: 23 },
  { number: 27, name: "Analytics Expert", function: "Analise de Dados", description: "GA, relatorios", status: "working", lastExecutionTime: "3m", tasksCompleted: 178 },
  { number: 28, name: "Partnership Manager", function: "Parcerias", description: "Integracoes", status: "online", lastExecutionTime: "2h", tasksCompleted: 34 },
  { number: 29, name: "HR Manager", function: "Recursos Humanos", description: "Equipe, cultura", status: "online", lastExecutionTime: "1h", tasksCompleted: 56 },
  { number: 30, name: "Translator", function: "Traducao", description: "20+ idiomas", status: "online", lastExecutionTime: "4m", tasksCompleted: 423 },
];

export const queuedTasks: Task[] = [
  { id: "1", agentNumber: 5, agentName: "Copy Master", description: "Criar headline para landing page", status: "queued", createdAt: "2 min atras" },
  { id: "2", agentNumber: 7, agentName: "Social Media Master", description: "Criar post Instagram", status: "queued", createdAt: "5 min atras" },
  { id: "3", agentNumber: 17, agentName: "Frontend Developer", description: "Implementar componente de checkout", status: "running", createdAt: "8 min atras" },
  { id: "4", agentNumber: 8, agentName: "Content Writer", description: "Escrever artigo sobre IA", status: "queued", createdAt: "12 min atras" },
  { id: "5", agentNumber: 11, agentName: "Customer Service", description: "Responder ticket #4523", status: "running", createdAt: "15 min atras" },
];

export const executionHistory: Task[] = [
  { id: "h1", agentNumber: 1, agentName: "CEO Assistant", description: "Analise de mercado Q1", status: "completed", createdAt: "1h atras", completedAt: "45 min atras" },
  { id: "h2", agentNumber: 5, agentName: "Copy Master", description: "Email de lancamento", status: "completed", createdAt: "2h atras", completedAt: "1h 50m atras" },
  { id: "h3", agentNumber: 16, agentName: "UI/UX Designer", description: "Redesign dashboard", status: "completed", createdAt: "3h atras", completedAt: "2h 30m atras" },
  { id: "h4", agentNumber: 9, agentName: "SEO Specialist", description: "Otimizacao de keywords", status: "failed", createdAt: "4h atras", completedAt: "3h 45m atras" },
  { id: "h5", agentNumber: 18, agentName: "Backend Developer", description: "API de pagamentos", status: "completed", createdAt: "5h atras", completedAt: "4h 20m atras" },
];

export const tasksPerHour = [
  { hour: "00:00", tasks: 12 },
  { hour: "02:00", tasks: 8 },
  { hour: "04:00", tasks: 5 },
  { hour: "06:00", tasks: 15 },
  { hour: "08:00", tasks: 45 },
  { hour: "10:00", tasks: 78 },
  { hour: "12:00", tasks: 65 },
  { hour: "14:00", tasks: 89 },
  { hour: "16:00", tasks: 95 },
  { hour: "18:00", tasks: 72 },
  { hour: "20:00", tasks: 48 },
  { hour: "22:00", tasks: 25 },
];

export const topAgents = [
  { name: "Customer Service", tasks: 892 },
  { name: "Social Media", tasks: 523 },
  { name: "Translator", tasks: 423 },
  { name: "Copy Master", tasks: 412 },
  { name: "Frontend Dev", tasks: 345 },
];

export const avgExecutionTime = [
  { agent: "Copy", time: 2.5 },
  { agent: "Social", time: 1.8 },
  { agent: "Support", time: 0.5 },
  { agent: "Frontend", time: 8.2 },
  { agent: "Backend", time: 12.4 },
];
