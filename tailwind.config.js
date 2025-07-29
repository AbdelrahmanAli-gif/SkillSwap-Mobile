/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main-color": '#fe7843',
        "text-primary": '#b4afa8',
        "text-secondary": '#7c7c7c',
        "text-light": '#ffffff',
        "text-dark": '#000000cc',
        "input-bg": 'rgba(21, 19, 19, 0.968)',
        "card-border": '#8b6f5a',
        "card-content-border": '#5d5149',
        "skill-teach-bg": '#ffe5b4',
        "skill-learn-bg": '#bc640dd8',
        "btn-submit-bg": '#8b6f5a',
        "btn-submit-hover": '#635041',
      }
    },
  },
  plugins: [],
}