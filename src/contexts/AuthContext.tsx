import React, { createContext, useContext, useState, useCallback } from "react";

export interface AdminInfo {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  admin: AdminInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, admin: AdminInfo) => void;
  logout: () => void;
}

const TOKEN_KEY = "akf_admin_token";
const ADMIN_KEY = "akf_admin_info";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    const raw = localStorage.getItem(ADMIN_KEY);
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  const login = useCallback((newToken: string, adminInfo: AdminInfo) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminInfo));
    setToken(newToken);
    setAdmin(adminInfo);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
