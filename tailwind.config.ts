import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '25': '6.25rem', // 100px
        '30': '7.5rem',  // 120px
        '35': '8.75rem', // 140px
        '40': '10rem',   // 160px
      }
    },
  },
  plugins: [],
} satisfies Config;
