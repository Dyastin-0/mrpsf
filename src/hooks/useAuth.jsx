import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [signingIn, setSigningIn] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post("/refresh");
        setToken(response.data);
        setSigningIn(false);
      } catch (error) {
        console.error(error);
        setToken(null);
        setSigningIn(false);
      }
    };
    getToken();
  }, []);

  const value = {
    token,
    setToken,
    signingIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default useAuth;
