import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "./useAuth";

const LogsContext = createContext();

export const LogsProvider = ({ children }) => {
  const { api } = useAxios();
  const { token } = useAuth();

  const [logs, setLogs] = useState([]);
  const [window, setWindow] = useState([]);
  const [pointers, setPointers] = useState({ left: 0, right: 12 });

  useEffect(() => {
    if (!token) return;
    const subscribe = async () => {
      try {
        await api.get(`/config/logs/ws?t=${token}`);
      } catch (error) {
        console.error("WebSocket subscription error:", error);
      }
    };
    subscribe();
  }, [token]);

  useEffect(() => {
    if (logs.length === 0) return;
    setPointers({ left: Math.max(0, logs.length - 12), right: logs.length });
  }, [logs]);

  useEffect(() => {
    if (logs.length === 0) return;

    setWindow(logs.slice(pointers.left, pointers.right));
  }, [logs, pointers]);

  const moveWindow = (num) => {
    setPointers((prev) => {
      let newLeft = Math.max(0, prev.left - num);
      let newRight = Math.min(logs.length, prev.right - num);

      if (newRight - newLeft < 12) {
        return prev;
      }

      return { left: newLeft, right: newRight };
    });
  };

  return (
    <LogsContext.Provider
      value={{ logs, mutate: setLogs, window, moveWindow, pointers }}
    >
      {children}
    </LogsContext.Provider>
  );
};

const useLogs = () => {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error("useLogs must be used within a LogsProvider");
  }
  return context;
};

export default useLogs;
