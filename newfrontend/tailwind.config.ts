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
        lightWalnutBrown: "#9C8772", // 나무 껍질 색
        hoverlightWalnutBrown: "#8c7763", // 나무 껍질 색
        mainGreen: "#bcebc4", // 연한 이끼색
        coralRed: "#e57373",
        mainDarkGreen: "#3c4a3e",
        loginLightGreen: "rgb(218,229,221)",
        loginDarkGreen: "rgb(64,116,77)",
        hoverloginDarkGreen:  "rgb(50, 91, 60)",
      },
      boxShadow: {
        "custom-lg": "0px 4px 10px 2px rgba(0, 0, 0, 0.1)",
      },
      height: {
        "82": "20.5rem",
        "100": "25rem",
      },
      margin: {
        "1/24": "4.166%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
