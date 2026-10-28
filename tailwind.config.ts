import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexora: {
          green: "#76B900",
          "green-hover": "#86D000",
          "green-dark": "#5C9100",
          "green-glow": "rgba(118, 185, 0, 0.35)",
          black: "#0A0A0A",
          dark: "#101010",
          card: "#151515",
          "card-hover": "#1C1C1C",
          border: "#282828",
          divider: "#303030",
          muted: "#909090",
          light: "#F5F5F7",
          "light-card": "#FFFFFF",
          "light-border": "#E2E2E6",
        },
      },
      boxShadow: {
        "neon-sm": "0 0 10px rgba(118, 185, 0, 0.25)",
        "neon-md": "0 0 20px rgba(118, 185, 0, 0.35)",
        "neon-lg": "0 0 35px rgba(118, 185, 0, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
