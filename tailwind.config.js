/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-color": { light: "#F05A1F", dark: "#fe7843" },
        "text-primary": { light: "#000000", dark: "#f4f2ee" },
        "text-secondary": { light: "#4a4745", dark: "#f4f2eece" },
        "text-light": { light: "#000000", dark: "#ffffff" },
        "text-dark": { light: "#ffffff", dark: "#000000cc" },
        "input-bg": { light: "#ffffff", dark: "rgba(21, 19, 19, 0.968)" },
        "card-border": { light: "#dcdcdc", dark: "#8b6f5a" },
        "card-content-border": { light: "#e0e0e0", dark: "#5d5149" },
        "skill-teach-bg": { light: "#e5cdb4", dark: "#ffe5b4" },
        "skill-learn-bg": "#bc640dd8",
        "btn-submit-bg": { light: "#BF8B64", dark: "#b88e6e" },
        "btn-submit-hover": { light: "#a27655", dark: "#8e6b51" },
        "card-background": { light: "#ffffff", dark: "#a3875a3e" },
      }
    }
  },
  plugins: []
};
