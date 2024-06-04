/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#1c603a",
        "primary-light": "#8de29a", // "light" is a reserved word in Tailwind, so we use "light" instead of "light
        light: "#ebfaeb",
        secondary: "#ff794d",
      },
    },
  },
  plugins: [],
};
