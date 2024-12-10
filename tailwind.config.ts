import type { Config } from "tailwindcss";

const config: Config = {
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'radial-pulse': 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '50%': { transform: 'translateY(-30px) scale(1.5)', opacity: '1' },
        },
        reflectionSlide: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'shimmer-gold': {
          '0%': { transform: 'translateX(-100%)', opacity: '0.3' },
          '50%': { transform: 'translateX(100%)', opacity: '0.6' },
          '100%': { transform: 'translateX(-100%)', opacity: '0.3' }
        },
        'shimmer-silver': {
          '0%': { transform: 'translateX(100%)', opacity: '0.2' },
          '50%': { transform: 'translateX(-100%)', opacity: '0.4' },
          '100%': { transform: 'translateX(100%)', opacity: '0.2' }
        },
        'radial-pulse': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        reflectionSlide: 'reflectionSlide 3s linear infinite',
        'shimmer-gold': 'shimmer-gold 4s ease-in-out infinite',
        'shimmer-silver': 'shimmer-silver 5s ease-in-out infinite',
        'radial-pulse': 'radial-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
