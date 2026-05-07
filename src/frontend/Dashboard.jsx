import { useState, useEffect } from "react";

// Adiciona fallback + retry automático
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Função que verifica se API tá online
const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("API offline:", error);
    return false;
  }
};

// Ao carregar dashboard
export const useApiHealth = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkApiHealth().then((online) => {
      setIsOnline(online);
      if (!online) {
        setError("⚠️ API offline. Verifique se backend está rodando.");
        // Tenta reconectar a cada 5 segundos
        const interval = setInterval(() => {
          checkApiHealth().then((online) => {
            setIsOnline(online);
            if (online) {
              setError(null);
            }
          });
        }, 5000);
        return () => clearInterval(interval);
      }
    });
  }, []);

  return { isOnline, error };
};
