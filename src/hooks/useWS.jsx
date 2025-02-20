import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useAuth from "./useAuth";
import useToast from "../components/hooks/useToast";
import useDomains from "./useDomains";
import useHealth from "./useHealth";
import useLogs from "./useLogs";
import useTerminal from "./useTerminal";

const WSContext = createContext();

export const WSProvider = ({ children }) => {
  const { token } = useAuth();
  const { toastInfo } = useToast();
  const { mutate: mutateDomains } = useDomains();
  const { mutate: mutateHealth } = useHealth();
  const { mutate: mutateLogs } = useLogs();
  const { mutate: mutateTerminalLogs } = useTerminal();

  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected.");
    }
  }, []);

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
        if (data.type === "stdout")
          mutateTerminalLogs((prev) => [...prev, data.message]);
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
    <WSContext.Provider value={{ isConnected, sendMessage }}>
      {children}
    </WSContext.Provider>
  );
};

const useWS = () => {
  const context = useContext(WSContext);
  if (!context) {
    throw new Error("useWS must be used within a WSProvider");
  }
  return context;
};

export default useWS;
