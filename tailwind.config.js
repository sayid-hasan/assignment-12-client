/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      fontFamily: {
        Cinzel: ' "Cinzel", serif',
      },
    },
  },
  plugins: [require("daisyui")],
};
