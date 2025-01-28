import { createContext, useContext } from "react";
import useSWR from "swr";
import useAxios from "../hooks/useAxios"; // Assuming useAxios is your custom hook for Axios setup

const DomainsContext = createContext();

export const DomainsProvider = ({ children }) => {
  const { api, isAxiosReady } = useAxios();

  const { data: domains, error } = useSWR(
    isAxiosReady ? "/config" : null,
    async () => {
      const response = await api.get("/config");
      return response.data;
    }
  );

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
