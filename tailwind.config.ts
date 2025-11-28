import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "floating-slow": "floating 8s ease-in-out infinite",
        "floating-medium": "floating 6s ease-in-out infinite",
        "floating-fast": "floating 4s ease-in-out infinite",
        "shimmer-text": "shimmer 2s linear infinite",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};

export default config;
