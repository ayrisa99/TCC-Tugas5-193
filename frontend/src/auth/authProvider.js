import { createContext, useState } from "react";
import axios from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  const login = async (data) => {
    const response = await axios.post("/login", data, {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    localStorage.setItem("token", response.data.accessToken);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("/token", {
        withCredentials: true,
      });
      setAccessToken(response.data.accessToken);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.accessToken;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    await axios.get("/logout", {
      withCredentials: true,
    });
    setAccessToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
