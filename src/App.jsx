import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth";

const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Proxies = lazy(() => import("./pages/Proxies"));
const Logs = lazy(() => import("./pages/Logs"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <Navbar />
      <div className="relative max-w-[1300px] w-full h-full justify-center flex flex-1">
        {token && <Sidebar />}
        <div className="w-full">
          <Suspense>
            <Routes>
              <Route path="/sign-in" element={<Signin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/proxies" element={<Proxies />} />
                <Route path="/logs" element={<Logs />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
