// Agent Base - Classe que TODOS os agentes herdam

const Anthropic = require("@anthropic-ai/sdk");
const OpenAI = require("openai");

class AgentBase {
  constructor(agentConfig, supabaseClient) {
    this.id = agentConfig.number;
    this.name = agentConfig.name;
    this.function = agentConfig.function;
    this.aiModel = agentConfig.ai_model;
    this.systemPrompt = agentConfig.system_prompt;
    this.supabase = supabaseClient;
    
    // Inicializa clientes de IA
    if (this.aiModel === "claude") {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    } else if (this.aiModel === "gpt4") {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  // Método principal: Processar uma tarefa
  async executeTask(companyId, taskDescription, context = {}) {
    try {
      console.log(`[${this.name}] Iniciando tarefa: ${taskDescription}`);

      // Monta o prompt com contexto
      const fullPrompt = this.buildPrompt(taskDescription, context);

      // Chama a IA apropriada
      let response;
      if (this.aiModel === "claude") {
        response = await this.callClaude(fullPrompt);
      } else if (this.aiModel === "gpt4") {
        response = await this.callGPT4(fullPrompt);
      }

      // Salva resultado no banco
      await this.logTaskCompletion(companyId, taskDescription, response);

      return {
        success: true,
        agentName: this.name,
        result: response,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`[${this.name}] ERRO:`, error.message);
      return {
        success: false,
        agentName: this.name,
        error: error.message,
      };
    }
  }

  // Chama Claude
  async callClaude(prompt) {
    const message = await this.client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: this.systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return message.content[0].text;
  }

  // Chama ChatGPT
  async callGPT4(prompt) {
    const completion = await this.client.chat.completions.create({
      model: "gpt-4-turbo",
      temperature: 0.7,
      max_tokens: 4096,
      system: this.systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  }

  // Monta o prompt completo
  buildPrompt(taskDescription, context) {
    let prompt = `TAREFA: ${taskDescription}\n\n`;

    if (Object.keys(context).length > 0) {
      prompt += `CONTEXTO:\n`;
      Object.entries(context).forEach(([key, value]) => {
        prompt += `- ${key}: ${JSON.stringify(value)}\n`;
      });
    }

    prompt += `\nResponda de forma estruturada e pronta para implementação.`;
    return prompt;
  }

  // Salva no banco de dados
  async logTaskCompletion(companyId, task, result) {
    await this.supabase.from("logs").insert([
      {
        company_id: companyId,
        agent_id: this.id,
        event_type: "task_completed",
        event_data: {
          task: task,
          result: result.substring(0, 500), // Primeiros 500 chars
          timestamp: new Date(),
        },
      },
    ]);
  }
}

module.exports = AgentBase;
