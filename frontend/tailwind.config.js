/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // manual toggle for dashboards
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      colors: {
        background: "#0b0f1a",
        surface: "#111827",
        card: "#0f172a",
        border: "#1f2937",

        primary: {
          DEFAULT: "#6366f1", // indigo-500
          hover: "#4f46e5",
          foreground: "#ffffff",
        },

        secondary: {
          DEFAULT: "#22d3ee",
          hover: "#06b6d4",
          foreground: "#0f172a",
        },

        success: "#22c55e",
        warning: "#facc15",
        danger: "#ef4444",

        muted: {
          DEFAULT: "#9ca3af",
          foreground: "#6b7280",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.35)",
        neon: "0 0 25px rgba(34,211,238,0.35)",
        card: "0 20px 50px rgba(0,0,0,0.5)",
      },

      backdropBlur: {
        xs: "2px",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 4s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(99,102,241,0.7)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
