/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ["var(--font-domaine)", 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: "#0a0a0a",
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.15)",
        },
        muted: "#888888",
        secondary: "#a1a1a1",
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      },
    },
  },
  plugins: [],
};