/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/src/assets/background-galaxy.png')",
        "nlw-gradient":
          "linear-gradient(90deg, #9572FC 20%, #43E7AD 60%, #E1D55D 20%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
      colors: {},
    },
  },
  plugins: [],
};