import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#edfaff",
          100: "#d7f2ff",
          500: "#0c8cc8",
          700: "#075f8e",
          950: "#062339"
        },
        aqua: {
          100: "#ccfbf1",
          400: "#2dd4bf",
          600: "#0d9488"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(6, 35, 57, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
