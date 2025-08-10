/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-color": { light: "#e0541d", dark: "#fe7843" },
        "text-primary": { light: "#4d2608", dark: "#b4afa8" },
        "text-secondary": { light: "#4a4745", dark: "#7c7c7c" },
        "text-light": { light: "#000000", dark: "#ffffff" },
        "text-dark": { light: "#ffffff", dark: "#000000cc" },
        "input-bg": { light: "#ffffff", dark: "rgba(21, 19, 19, 0.968)" },
        "card-border": { light: "#dcdcdc", dark: "#8b6f5a" },
        "card-content-border": { light: "#e0e0e0", dark: "#5d5149" },
        "skill-teach-bg": "#ffe5b4",
        "skill-learn-bg": "#bc640dd8",
        "btn-submit-bg": { light: "#68482f", dark: "#8b6f5a" },
        "btn-submit-hover": { light: "#a27655", dark: "#635041" },
        "card-background": { light: "#c9ae93", dark: "#a3875a3e" },
      }
    }
  },
  plugins: []
};
