/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      Cinzel: ' "Cinzel", serif',
      Jaro: ' "Jaro", serif',
      Inter: ' "Inter", serif',
    },
  },

  plugins: [require("daisyui")],
};
