import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export interface AgentExecuteParams {
  companyId: string;
  taskDescription: string;
  context?: Record<string, unknown>;
}

export interface AgentExecuteResponse {
  success: boolean;
  taskId?: string;
  result?: unknown;
  error?: string;
}

export const useAgent = async (
  agentNumber: number,
  task: string,
  companyId: string,
  context: Record<string, unknown> = {}
): Promise<AgentExecuteResponse | undefined> => {
  try {
    const response = await axios.post<AgentExecuteResponse>(
      `${API_BASE}/agent/${agentNumber}/execute`,
      {
        company_id: companyId,
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

export const api = {
  useAgent,
};
