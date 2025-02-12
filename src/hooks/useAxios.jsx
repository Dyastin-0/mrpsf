import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshTokenPromise = null;

const useAxios = () => {
  const { token, setToken } = useAuth();
  const [isAxiosReady, setIsAxiosReady] = useState(false);

  useEffect(() => {
    if (!token) return;

    const interceptor = api.interceptors.request.use(
      async (config) => {
        const decodedAccessToken = jwtDecode(token);
        const isExpired = dayjs.unix(decodedAccessToken.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }

        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshAccessToken().finally(() => {
            refreshTokenPromise = null;
          });
        }

        try {
          const newToken = await refreshTokenPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      (error) => Promise.reject(error)
    );

    setIsAxiosReady(true);

    return () => api.interceptors.request.eject(interceptor);
  }, [token]);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/refresh");
      const newAccessToken = response.data;
      setToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  return { api, isAxiosReady };
};

export default useAxios;
