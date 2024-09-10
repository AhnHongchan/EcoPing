import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightWalnutBrown: "#A68A6D", // 나무 껍질 색
        mainGreen: "#bcebc4", // 연한 이끼색
        coralRed: "#e57373"
      },
    },
  },
  plugins: [],
};
export default config;
