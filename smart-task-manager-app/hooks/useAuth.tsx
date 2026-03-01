import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import API from "../services/api";
import { saveToken, getToken, removeToken } from "../utils/storage";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
  try {
    const token = await getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const res = await API.get("/auth/me");
    setUser(res.data);
  } catch (error) {
    await removeToken();
    setUser(null);
  }

  setLoading(false);
};
  const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password });
    const userData: User = res.data;

    await saveToken(userData.token);
    setUser(userData);

    router.replace("/(protected)");
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    const userData: User = res.data;

    await saveToken(userData.token);
    setUser(userData);

    router.replace("/(protected)");
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};