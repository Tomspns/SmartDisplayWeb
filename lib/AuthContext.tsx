"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { me, login as apiLogin, logout as apiLogout, User } from "./authApi";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const data = await me();
      if (data && typeof data === "object" && "user" in data) {
        setUser((data as { user: User }).user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }

  async function login(email: string, password: string) {
    await apiLogin({ email, password });
    await refreshUser();
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  useEffect(() => {
    async function init() {
      await refreshUser();
      setLoading(false);
    }
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}