import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
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
        brand: {
          cream: "var(--background)",
          tan: "var(--muted)",
          forest: "var(--accent-strong)",
          darkforest: "#061018",
          accent: "var(--accent)",
          text: {
            primary: "var(--foreground)",
            secondary: "var(--muted-foreground)",
            muted: "var(--muted-foreground)",
          },
          dark: {
            bg: "var(--background)",
            surface: "var(--card-strong)",
            border: "var(--border)",
            text: "var(--foreground)",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
