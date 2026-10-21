/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F7F9",
        ink: "#0E1726",
        muted: "#5B6577",
        line: "#E3E7ED",
        cobalt: {
          DEFAULT: "#2547F5",
          dark: "#1B35C4",
          soft: "#E8EDFF",
        },
        amber: {
          DEFAULT: "#F5A524",
          soft: "#FFF1D6",
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};
