"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg bg-[#1F1F1F] border border-[#2D2D2D] ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative p-2 rounded-lg transition-colors border ${
        isDark
          ? "bg-[#181818] border-[#2D2D2D] text-zinc-300 hover:text-[#76B900] hover:border-[#76B900]/50"
          : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black hover:border-black"
      } ${className}`}
      aria-label="Mavzuni o'zgartirish (Dark / Light)"
      title={isDark ? "Yorug' mavzuga o'tish" : "Qorong'i mavzuga o'tish"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#76B900] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-800 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
