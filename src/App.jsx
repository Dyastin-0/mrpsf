import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SideNavbar from "./components/SideNavbar";

const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Proxies = lazy(() => import("./pages/Proxies"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <Navbar />
      <div className="main-content flex flex-1 gap-3 p-3">
        <SideNavbar />
        <div className="page-content flex-1">
          <Suspense>
            <Routes>
              <Route path="/sign-in" element={<Signin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/proxies" element={<Proxies />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
