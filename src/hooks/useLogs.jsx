import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "./useAuth";

const LogsContext = createContext();

export const LogsProvider = ({ children }) => {
  const { api } = useAxios();
  const { token } = useAuth();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!token) return;
    const subscribe = async () => {
      api.get(`/config/logs/ws?t=${token}`);
    };
    subscribe();
  }, [token]);

  return (
    <LogsContext.Provider value={{ logs, mutate: setLogs }}>
      {children}
    </LogsContext.Provider>
  );
};

const useLogs = () => {
  const context = useContext(LogsContext);

  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }

  return context;
};

export default useLogs;
