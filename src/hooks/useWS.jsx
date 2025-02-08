import { createContext, useEffect, useRef, useState } from "react";
import useAuth from "./useAuth";
import useToast from "../components/hooks/useToast";
import useDomains from "./useDomains";
import useHealth from "./useHealth";
import useLogs from "./useLogs";

const WSContext = createContext();

export const WSProvider = ({ children }) => {
  const { token } = useAuth();
  const { toastInfo } = useToast();
  const { mutate: mutateDomains } = useDomains();
  const { mutate: mutateHealth } = useHealth();
  const { mutate: mutateLogs } = useLogs();

  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(import.meta.env.VITE_WS_URL + `?t=${token}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        toastInfo("WebSocket connected");
      };

      ws.onclose = () => {
        setIsConnected(false);
        toastInfo("WebSocket disconnected");
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "config") mutateDomains(data.config, false);
        if (data.type === "health") mutateHealth(data.health);
        if (data.type === "log") mutateLogs((prev) => [...prev, data.log]);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [token]);

  return (
    <WSContext.Provider value={{ isConnected }}>{children}</WSContext.Provider>
  );
};
