import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A1B3D",
        lime: "#A6F23C",
        "lime-light": "#C8FF7A",
        offwhite: "#F4F6FB",
        slate: "#8894A3",
        ink: "#07152E",
        line: "#DDE4EF"
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(10, 27, 61, 0.12)",
        card: "0 10px 30px rgba(10, 27, 61, 0.08)"
      }
    }
  },
  plugins: [forms]
};

export default config;
