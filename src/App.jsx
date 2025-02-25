import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth";

const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Terminal = lazy(() => import("./pages/Terminal"));
const NotFound = lazy(() => import("./pages/NotFound"));

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { token } = useAuth();

  return (
    <div className="relative flex gap-3 p-3 w-full h-full justify-center">
      {token && <Sidebar />}
      <div className="w-full h-full">
        <Navbar />
        <Suspense>
          <Routes>
            <Route path="/sign-in" element={<Signin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/terminal" element={<Terminal />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
