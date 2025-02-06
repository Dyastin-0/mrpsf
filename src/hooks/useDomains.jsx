import { createContext, useContext } from "react";
import useSWR from "swr";
import useAxios from "../hooks/useAxios";

const DomainsContext = createContext();

export const DomainsProvider = ({ children }) => {
  const { api, isAxiosReady } = useAxios();

  const {
    data: domains,
    error,
    mutate,
  } = useSWR(
    isAxiosReady ? "/config" : null,
    async () => {
      const response = await api.get("/config");
      console.log(response);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <DomainsContext.Provider value={{ domains, mutate, error }}>
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
