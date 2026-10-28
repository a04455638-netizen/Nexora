"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, phone?: string, fullName?: string, role?: "customer" | "seller" | "admin") => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const DEFAULT_USER: UserProfile = {
  id: "usr-default-01",
  fullName: "Alisher Navoiy",
  email: "alisher@nexora.uz",
  phone: "+998 90 999 88 77",
  city: "Toshkent shahri",
  address: "Amir Temur ko'chasi, 12-uy",
  role: "customer",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexora_user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        localStorage.setItem("nexora_user", JSON.stringify(DEFAULT_USER));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  const login = (
    email: string,
    phone = "+998 90 123 45 67",
    fullName = "NEXORA Foydalanuvchisi",
    role: "customer" | "seller" | "admin" = "customer"
  ) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone,
      city: "Toshkent shahri",
      address: "Chilonzor tumani, 9-mavze",
      role,
    };
    setUser(newUser);
    localStorage.setItem("nexora_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexora_user");
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("nexora_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAuthenticated: Boolean(user),
        isAdmin: Boolean(user?.role === "admin" || user?.email?.includes("admin")),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
