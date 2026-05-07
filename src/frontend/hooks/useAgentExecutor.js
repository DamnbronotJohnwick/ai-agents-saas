import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useAgentExecutor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const executeAgent = useCallback(
    async (agentNumber, taskDescription, companyId = "test-company") => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const response = await axios.post(
          `${API_BASE}/agent/${agentNumber}/execute`,
          {
            company_id: companyId,
            task_description: taskDescription,
            context: {},
          },
          {
            timeout: 30000, // 30 segundos timeout
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setResult(response.data);
        return response.data;
      } catch (err) {
        const errorMsg =
          err.response?.data?.error || err.message || "Erro desconhecido";
        setError(errorMsg);
        console.error(`[Agent #${agentNumber}] Error:`, errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { executeAgent, loading, result, error };
};
