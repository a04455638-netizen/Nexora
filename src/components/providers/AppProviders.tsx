"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/features/cart/CartContext";
import { FavoritesProvider } from "@/features/favorites/FavoritesContext";
import { CompareProvider } from "@/features/compare/CompareContext";
import { AuthProvider } from "@/features/account/AuthContext";
import { RecentlyViewedProvider } from "@/features/recently-viewed/RecentlyViewedContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WelcomeIdentificationModal } from "@/components/auth/WelcomeIdentificationModal";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <CompareProvider>
              <RecentlyViewedProvider>
                {children}
                <CartDrawer />
                <WelcomeIdentificationModal />
              </RecentlyViewedProvider>
            </CompareProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
