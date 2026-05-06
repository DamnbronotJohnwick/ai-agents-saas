// Orquestrador - Gerencia a fila de agentes

const AgentBase = require("./agent-base");
const agentsConfig = require("../config/agents-config.json");

class AgentOrchestrator {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    this.agents = {};
    this.queue = [];

    // Inicializa todos os 30 agentes
    agentsConfig.agents.forEach((agentConfig) => {
      this.agents[agentConfig.number] = new AgentBase(
        agentConfig,
        supabaseClient
      );
    });
  }

  // Adiciona tarefa na fila
  async addToQueue(companyId, agentNumber, taskDescription, context = {}) {
    const queueItem = {
      company_id: companyId,
      agent_number: agentNumber,
      prompt_request: taskDescription,
      context: context,
      status: "waiting",
      created_at: new Date(),
    };

    this.queue.push(queueItem);
    console.log(
      `[FILA] Nova tarefa adicionada. Total na fila: ${this.queue.length}`
    );

    return queueItem;
  }

  // Processa a fila (executa um agente por vez)
  async processQueue() {
    while (this.queue.length > 0) {
      const item = this.queue.shift(); // Pega primeiro da fila

      console.log(
        `[PROCESSANDO] Agente #${item.agent_number} - ${item.prompt_request}`
      );

      const agent = this.agents[item.agent_number];
      const result = await agent.executeTask(
        item.company_id,
        item.prompt_request,
        item.context
      );

      // Salva resultado
      await this.supabase.from("agent_queue").insert([
        {
          company_id: item.company_id,
          agent_number: item.agent_number,
          prompt_request: item.prompt_request,
          status: result.success ? "done" : "failed",
          result: JSON.stringify(result),
          processed_at: new Date(),
        },
      ]);
    }
  }

  // Executa tarefa em um agente específico
  async executeAgentTask(companyId, agentNumber, taskDescription, context) {
    if (!this.agents[agentNumber]) {
      return { error: `Agente #${agentNumber} não encontrado` };
    }

    const agent = this.agents[agentNumber];
    return await agent.executeTask(companyId, taskDescription, context);
  }

  // Executa multiple agentes em paralelo (pra tarefas independentes)
  async executeParallel(companyId, tasks) {
    // tasks = [{agentNumber: 5, task: 'descrição'}, ...]
    const promises = tasks.map((t) =>
      this.executeAgentTask(
        companyId,
        t.agentNumber,
        t.task,
        t.context || {}
      )
    );

    return await Promise.all(promises);
  }

  // Especial: CEO Reviewer (agente #2) revisa tudo
  async reviewWithCEO(companyId, contentToReview) {
    const reviewer = this.agents[2]; // CEO Reviewer
    return await reviewer.executeTask(companyId, 
      `Revise e melhore este conteúdo. Apontando erros, sugerindo melhorias:\n\n${contentToReview}`
    );
  }
}

module.exports = AgentOrchestrator;
