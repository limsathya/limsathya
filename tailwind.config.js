/** @type {import('tailwindcss').Config} */
module.exports = {
  // Theme is driven by a data-theme attribute (set by an inline script + ThemeProvider).
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn semantic tokens (themed via CSS variables in globals.css)
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },

        // Themeable surfaces + text (channel vars so opacity modifiers still work)
        night: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          2: "rgb(var(--surface) / <alpha-value>)",
          3: "rgb(var(--surface-2) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        mist: {
          DEFAULT: "rgb(var(--mist) / <alpha-value>)",
          dim: "rgb(var(--mist-dim) / <alpha-value>)",
        },
        // Accent text/hover that adapts per theme (amber on dark, burnt on light)
        accentInk: "rgb(var(--accent-ink) / <alpha-value>)",

        // Fixed accents — identical in both themes
        ember: "#F6A23C",
        flame: "#E5552E",
        glow: "#FFE3B0",
        // Fixed dark ink for text sitting on ember/flame fills
        onAccent: "#1A0F06",
      },
      fontFamily: {
        display: ["var(--font-misans)"],
        sans:    ["var(--font-misans)"],
        mono:    ["var(--font-misans)"],
        sc:      ["var(--font-misans)"],
        khmer:   ["var(--font-misans)"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.92" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 7.5s ease-in-out infinite",
        rise: "rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};
