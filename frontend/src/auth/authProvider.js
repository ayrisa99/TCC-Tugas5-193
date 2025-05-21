// src/auth/authProvider.js
import { createContext, useState } from "react";
import axios from "../api/axiosInstance";
import { BASE_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const login = async (data) => {
    const response = await axios.post(`${BASE_URL}/login`, data, {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/token`, {
        withCredentials: true,
      });
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    await axios.get(`${BASE_URL}/logout`, {
      withCredentials: true,
    });
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
