import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import useAxios from "../hooks/useAxios"; // Assuming useAxios is your custom hook for Axios setup
import useAuth from "./useAuth";

const DomainsContext = createContext();

export const DomainsProvider = ({ children }) => {
  const { api, isAxiosReady } = useAxios();
  const { token } = useAuth();

  useEffect(() => {
    if (!isAxiosReady) return;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL + `?t=${token}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data && mutate(data, false);
    };
  }, [isAxiosReady, api]);

  const {
    data: domains,
    error,
    mutate,
  } = useSWR(isAxiosReady ? "/config" : null, async () => {
    const response = await api.get("/config");
    return response.data;
  });

  return (
    <DomainsContext.Provider value={{ domains, error }}>
      {children}
    </DomainsContext.Provider>
  );
};

const useDomains = () => {
  const context = useContext(DomainsContext);

  if (!context) {
    throw new Error("useDomains must be used within a DomainsProvider");
  }

  return context;
};

export default useDomains;
