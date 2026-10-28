"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, phone?: string, fullName?: string, role?: "customer" | "seller" | "admin") => void;
  saveIdentifiedUser: (fullName: string, phone: string) => UserProfile;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexora_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.fullName) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("[AuthContext Hydration Error]:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveIdentifiedUser = (fullName: string, phone: string): UserProfile => {
    const cleanPhone = phone.trim();
    const digits = cleanPhone.replace(/\D/g, "");
    
    // Create authentic profile with unverified phone flag (privacy compliant)
    const newUser: UserProfile = {
      id: user?.id || `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: user?.email && !user.email.endsWith("@nexora.uz") ? user.email : `${digits}@nexora.uz`,
      phone: cleanPhone,
      city: user?.city || "Toshkent shahri",
      address: user?.address || "",
      role: user?.role || "customer",
      isPhoneVerified: false, // Explicitly false since OTP was not SMS verified
    };

    setUser(newUser);
    try {
      localStorage.setItem("nexora_user", JSON.stringify(newUser));
      localStorage.setItem("nexora_guest_info", JSON.stringify({ fullName: newUser.fullName, phone: newUser.phone }));
    } catch (e) {
      console.error("[LocalStorage Save Error]:", e);
    }
    return newUser;
  };

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
      isPhoneVerified: false,
    };
    setUser(newUser);
    try {
      localStorage.setItem("nexora_user", JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("nexora_user");
      localStorage.removeItem("nexora_guest_info");
    } catch (e) {
      console.error(e);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem("nexora_user", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        saveIdentifiedUser,
        logout,
        updateProfile,
        isAuthenticated: Boolean(user),
        isAdmin: Boolean(user?.role === "admin" || user?.email?.includes("admin")),
        isLoaded,
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

export default AuthContext;
