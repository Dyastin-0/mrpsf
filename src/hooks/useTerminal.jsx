import { createContext, useContext, useState } from "react";

const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  return (
    <TerminalContext.Provider value={{ logs, mutate: setLogs }}>
      {children}
    </TerminalContext.Provider>
  );
};

const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};

export default useTerminal;
