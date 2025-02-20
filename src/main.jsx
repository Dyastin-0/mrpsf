import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { ModalProvider } from "./components/hooks/useModal.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { DomainsProvider } from "./hooks/useDomains.jsx";
import { WSProvider } from "./hooks/useWS.jsx";
import { HealthProvider } from "./hooks/useHealth.jsx";
import { LogsProvider } from "./hooks/useLogs.jsx";
import { TerminalProvider } from "./hooks/useTerminal.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <LogsProvider>
        <DomainsProvider>
          <HealthProvider>
            <TerminalProvider>
              <WSProvider>
                <ModalProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ModalProvider>
              </WSProvider>
            </TerminalProvider>
          </HealthProvider>
        </DomainsProvider>
      </LogsProvider>
    </AuthProvider>
  </ToastProvider>
);
