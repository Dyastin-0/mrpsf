import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "./useAuth";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const { api } = useAxios();
  const { token } = useAuth();

  const [health, setHealth] = useState(null);

  useEffect(() => {
    if (!token) return;
    const subscribe = async () => {
      const { data } = await api.get("/config/health");
      data?.health && setHealth(data.health);
    };
    subscribe();
  }, [token]);

  return (
    <HealthContext.Provider value={{ health, mutate: setHealth }}>
      {children}
    </HealthContext.Provider>
  );
};

const useHealth = () => {
  const context = useContext(HealthContext);

  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }

  return context;
};

export default useHealth;
