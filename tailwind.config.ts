import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eg: {
          black: "#0D0D0D",
          carbon: "#1A1A1A",
          graphite: "#2B2B2B",
          gold: "#D6A21E",
          goldHover: "#B98A14",
          concrete: "#ECEAE6",
          lightText: "#4A4A4A",
          whatsapp: "#25D366",
          whatsappDark: "#1DA851",
        },
      },
      fontFamily: {
        condensed: ["var(--font-barlow)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        industrial: "0 14px 36px -12px rgba(0, 0, 0, 0.35)",
        industrialHover: "0 24px 48px -14px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
