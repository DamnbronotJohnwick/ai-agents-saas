// API Webhook - Recebe requisições e dispara agentes

const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const AgentOrchestrator = require("../agents/agent-orchestrator");

const router = express.Router();

// Inicializa Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// Inicializa orquestrador
const orchestrator = new AgentOrchestrator(supabase);

// ===== ENDPOINTS =====

// 1. Cliente pede para "CEO Assistant" analisar estratégia
router.post("/agent/1/strategy-analysis", async (req, res) => {
  try {
    const { company_id, business_data } = req.body;

    const result = await orchestrator.executeAgentTask(
      company_id,
      1, // CEO Assistant
      `Analise esta estratégia empresarial e recomende melhorias:\n${JSON.stringify(
        business_data
      )}`
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Cliente pede para "Copy Master" criar headlines
router.post("/agent/5/create-copy", async (req, res) => {
  try {
    const { company_id, product, audience } = req.body;

    const result = await orchestrator.executeAgentTask(
      company_id,
      5, // Copy Master
      `Cria 5 headlines para vender "${product}" para "${audience}". Usa urgência, benefício claro, call-to-action.`
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Cliente pede para "Frontend Developer" criar componente
router.post("/agent/17/create-component", async (req, res) => {
  try {
    const { company_id, component_name, requirements } = req.body;

    const result = await orchestrator.executeAgentTask(
      company_id,
      17, // Frontend Developer
      `Cria componente React chamado "${component_name}" com requisitos:\n${requirements}\n\nRetorna código pronto pra copiar e colar.`
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Cliente pede para "Website Builder" criar site completo
router.post("/agent/25/build-website", async (req, res) => {
  try {
    const { company_id, business_name, business_type, target_audience } =
      req.body;

    // Executa múltiplos agentes em paralelo
    const results = await orchestrator.executeParallel(company_id, [
      {
        agentNumber: 16, // UI/UX Designer
        task: `Design o layout de um site para ${business_name}. Tipo: ${business_type}. Público: ${target_audience}.`,
      },
      {
        agentNumber: 8, // Content Writer
        task: `Escreva conteúdo para site de ${business_name}. Copy convincente que vende.`,
      },
      {
        agentNumber: 17, // Frontend Developer
        task: `Cria HTML/CSS/JS para site de ${business_name} baseado no design fornecido.`,
      },
    ]);

    // CEO Reviewer verifica tudo
    const finalReview = await orchestrator.reviewWithCEO(
      company_id,
      `Site criado com:\n${JSON.stringify(results)}`
    );

    res.json({
      designs: results[0],
      content: results[1],
      code: results[2],
      review: finalReview,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Cliente pede para processar fila completa
router.post("/queue/process", async (req, res) => {
  try {
    orchestrator.processQueue();
    res.json({ message: "Fila em processamento..." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. ESPECIAL: Pipeline completo "Criar e Vender Produto"
router.post("/pipeline/product-launch", async (req, res) => {
  try {
    const {
      company_id,
      product_name,
      product_description,
      target_market,
      budget_usd,
    } = req.body;

    console.log(`[PIPELINE] Iniciando lançamento de ${product_name}`);

    // ETAPA 1: CEO pensa estratégia
    const strategy = await orchestrator.executeAgentTask(
      company_id,
      1,
      `Cria estratégia de lançamento para produto "${product_name}". Descrição: ${product_description}. Mercado: ${target_market}. Budget: $${budget_usd}`
    );

    // ETAPA 2: Múltiplos agentes trabalham em paralelo
    const parallel = await orchestrator.executeParallel(company_id, [
      {
        agentNumber: 5, // Copy Master
        task: `Cria copy de vendas IRRESISTÍVEL para "${product_name}".`,
      },
      {
        agentNumber: 16, // UI/UX Designer
        task: `Design landing page moderna para "${product_name}".`,
      },
      {
        agentNumber: 8, // Content Writer
        task: `Escreve 3 blog posts sobre ${product_name} que rankeiam no Google.`,
      },
      {
        agentNumber: 10, // PPC Ads Manager
        task: `Cria estratégia de Google Ads para "${product_name}" com budget $${budget_usd}.`,
      },
    ]);

    // ETAPA 3: Frontend constrói o site
    const website = await orchestrator.executeAgentTask(
      company_id,
      25,
      `Cria landing page completa e funcional baseada nos designs e copy acima.`
    );

    // ETAPA 4: CEO Reviewer verifica TUDO
    const finalReview = await orchestrator.reviewWithCEO(
      company_id,
      `Produto pronto: ${product_name}. Copy: ${parallel[0]}. Design: ${parallel[1]}. Content: ${parallel[2]}. Ads: ${parallel[3]}. Website: ${website}`
    );

    res.json({
      status: "LANÇAMENTO COMPLETO",
      strategy: strategy.result,
      copy: parallel[0].result,
      design: parallel[1].result,
      content: parallel[2].result,
      ads: parallel[3].result,
      website: website.result,
      ceo_review: finalReview.result,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
