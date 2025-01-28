import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { ModalProvider } from "./components/hooks/useModal.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { DomainsProvider } from "./hooks/useDomains.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <DomainsProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </DomainsProvider>
    </AuthProvider>
  </ToastProvider>
);
