/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '786px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        lightBlack: "#121111",
        customBlack: "#080808",
        black: "black",
        blue: "#0000FF",
        purple: "#a373ff"
      }
    },
  },
  plugins: [],
}
