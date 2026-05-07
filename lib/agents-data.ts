export type AgentStatus = "online" | "offline" | "working";

export type AgentCategory = "CEO" | "Marketing" | "Dev" | "Sales" | "Design" | "Operations" | "Other";

export interface Agent {
  id: number;
  name: string;
  function: string;
  description: string;
  category: AgentCategory;
  status: AgentStatus;
  lastExecutionTime: string;
  tasksCompleted: number;
}

export const agents: Agent[] = [
  {
    id: 1,
    name: "CEO Assistant",
    function: "CEO/Visão Estratégica",
    description: "Análise estratégica, decisões executivas, roadmap empresarial",
    category: "CEO",
    status: "online",
    lastExecutionTime: "há 2 min",
    tasksCompleted: 234,
  },
  {
    id: 2,
    name: "CEO Reviewer",
    function: "Revisor de Qualidade",
    description: "Verifica erros, melhora qualidade de tudo que foi feito",
    category: "CEO",
    status: "working",
    lastExecutionTime: "agora",
    tasksCompleted: 189,
  },
  {
    id: 3,
    name: "COO Manager",
    function: "Operações e Processos",
    description: "Gerencia operações, processos, timeline, recursos",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 5 min",
    tasksCompleted: 312,
  },
  {
    id: 4,
    name: "CFO Manager",
    function: "Finanças e Números",
    description: "Análise financeira, previsões, orçamento, ROI",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 10 min",
    tasksCompleted: 156,
  },
  {
    id: 5,
    name: "Copy Master",
    function: "Copywriting",
    description: "Cria textos de venda, headlines, emails que vendem",
    category: "Marketing",
    status: "online",
    lastExecutionTime: "há 1 min",
    tasksCompleted: 521,
  },
  {
    id: 6,
    name: "Email Sequence",
    function: "Sequências de Email",
    description: "Cria campanhas de email automáticas que convertem",
    category: "Marketing",
    status: "working",
    lastExecutionTime: "agora",
    tasksCompleted: 287,
  },
  {
    id: 7,
    name: "Social Media Master",
    function: "Marketing Social",
    description: "Cria posts, strategies, hashtags, virais",
    category: "Marketing",
    status: "online",
    lastExecutionTime: "há 3 min",
    tasksCompleted: 445,
  },
  {
    id: 8,
    name: "Content Writer",
    function: "Criação de Conteúdo",
    description: "Escreve blogs, artigos, guias, ebooks",
    category: "Marketing",
    status: "online",
    lastExecutionTime: "há 8 min",
    tasksCompleted: 334,
  },
  {
    id: 9,
    name: "SEO Specialist",
    function: "SEO e Otimização",
    description: "Otimiza conteúdo pra Google, keywords, rankings",
    category: "Marketing",
    status: "offline",
    lastExecutionTime: "há 2 horas",
    tasksCompleted: 198,
  },
  {
    id: 10,
    name: "PPC Ads Manager",
    function: "Anúncios Pagos",
    description: "Cria campanhas de ads, otimiza ROAS, testa variações",
    category: "Marketing",
    status: "online",
    lastExecutionTime: "há 15 min",
    tasksCompleted: 276,
  },
  {
    id: 11,
    name: "Customer Service",
    function: "Suporte ao Cliente",
    description: "Responde tickets, resolve problemas, atende cliente",
    category: "Sales",
    status: "working",
    lastExecutionTime: "agora",
    tasksCompleted: 612,
  },
  {
    id: 12,
    name: "Sales Closer",
    function: "Fechamento de Vendas",
    description: "Segue up com leads, fecha vendas, negocia",
    category: "Sales",
    status: "online",
    lastExecutionTime: "há 7 min",
    tasksCompleted: 189,
  },
  {
    id: 13,
    name: "Lead Qualifier",
    function: "Qualificação de Leads",
    description: "Avalia se lead é bom, Tier A/B/C",
    category: "Sales",
    status: "online",
    lastExecutionTime: "há 4 min",
    tasksCompleted: 423,
  },
  {
    id: 14,
    name: "Market Researcher",
    function: "Pesquisa de Mercado",
    description: "Analisa mercado, competição, tendências",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 20 min",
    tasksCompleted: 87,
  },
  {
    id: 15,
    name: "Product Manager",
    function: "Gestão de Produto",
    description: "Define features, roadmap, prioridades de produto",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 12 min",
    tasksCompleted: 156,
  },
  {
    id: 16,
    name: "UI/UX Designer",
    function: "Design de Interface",
    description: "Desenha layouts, prototypes, mockups",
    category: "Design",
    status: "working",
    lastExecutionTime: "agora",
    tasksCompleted: 234,
  },
  {
    id: 17,
    name: "Frontend Developer",
    function: "Desenvolvimento Frontend",
    description: "Codifica React, Vue, HTML/CSS, componentes",
    category: "Dev",
    status: "online",
    lastExecutionTime: "há 5 min",
    tasksCompleted: 387,
  },
  {
    id: 18,
    name: "Backend Developer",
    function: "Desenvolvimento Backend",
    description: "APIs, databases, lógica, integrações",
    category: "Dev",
    status: "online",
    lastExecutionTime: "há 9 min",
    tasksCompleted: 298,
  },
  {
    id: 19,
    name: "DevOps Engineer",
    function: "Infraestrutura e Deploy",
    description: "Deploy, servidores, CI/CD, automação",
    category: "Dev",
    status: "offline",
    lastExecutionTime: "há 1 hora",
    tasksCompleted: 145,
  },
  {
    id: 20,
    name: "Database Admin",
    function: "Administração de Dados",
    description: "Otimiza queries, backups, segurança de dados",
    category: "Dev",
    status: "online",
    lastExecutionTime: "há 30 min",
    tasksCompleted: 112,
  },
  {
    id: 21,
    name: "Security Officer",
    function: "Segurança e Compliance",
    description: "Garante segurança, GDPR, CCPA, compliance",
    category: "Dev",
    status: "online",
    lastExecutionTime: "há 45 min",
    tasksCompleted: 78,
  },
  {
    id: 22,
    name: "Brand Strategist",
    function: "Estratégia de Marca",
    description: "Define brand identity, voice, positioning",
    category: "Marketing",
    status: "online",
    lastExecutionTime: "há 25 min",
    tasksCompleted: 134,
  },
  {
    id: 23,
    name: "Video Creator",
    function: "Produção de Vídeo",
    description: "Roteiros, ideias, estrutura de vídeos",
    category: "Design",
    status: "offline",
    lastExecutionTime: "há 3 horas",
    tasksCompleted: 89,
  },
  {
    id: 24,
    name: "Graphic Designer",
    function: "Design Gráfico",
    description: "Cria banners, posts, infograficos",
    category: "Design",
    status: "online",
    lastExecutionTime: "há 18 min",
    tasksCompleted: 267,
  },
  {
    id: 25,
    name: "Website Builder",
    function: "Criação de Websites",
    description: "Cria sites, landing pages, ecommerce completos",
    category: "Dev",
    status: "working",
    lastExecutionTime: "agora",
    tasksCompleted: 178,
  },
  {
    id: 26,
    name: "Ecommerce Expert",
    function: "Otimização Ecommerce",
    description: "Otimiza conversão, checkout, produto páginas",
    category: "Sales",
    status: "online",
    lastExecutionTime: "há 35 min",
    tasksCompleted: 145,
  },
  {
    id: 27,
    name: "Analytics Expert",
    function: "Análise de Dados",
    description: "Google Analytics, dados, relatórios, insights",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 22 min",
    tasksCompleted: 198,
  },
  {
    id: 28,
    name: "Partnership Manager",
    function: "Parcerias e Integrações",
    description: "Identifica parceiros, propõe integrações",
    category: "Sales",
    status: "offline",
    lastExecutionTime: "há 4 horas",
    tasksCompleted: 56,
  },
  {
    id: 29,
    name: "HR Manager",
    function: "Recursos Humanos",
    description: "Planejamento de equipe, recrutamento, cultura",
    category: "Operations",
    status: "online",
    lastExecutionTime: "há 1 hora",
    tasksCompleted: 67,
  },
  {
    id: 30,
    name: "Translator",
    function: "Tradução Multilíngue",
    description: "Traduz conteúdo em 20+ idiomas",
    category: "Other",
    status: "online",
    lastExecutionTime: "há 6 min",
    tasksCompleted: 423,
  },
];

export const categories: AgentCategory[] = ["CEO", "Marketing", "Dev", "Sales", "Design", "Operations", "Other"];

export const getStatusColor = (status: AgentStatus) => {
  switch (status) {
    case "online":
      return "bg-online";
    case "offline":
      return "bg-offline";
    case "working":
      return "bg-working";
  }
};

export const getStatusLabel = (status: AgentStatus) => {
  switch (status) {
    case "online":
      return "Online";
    case "offline":
      return "Offline";
    case "working":
      return "Trabalhando";
  }
};
