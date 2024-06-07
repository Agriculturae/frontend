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
        "primary-light": "#9EC253", // "light" is a reserved word in Tailwind, so we use "light" instead of "light
        light: "#ebfaeb",
        secondary: "#D78C1D",
        dark: "#4D4D4D",
      },
    },
  },
  plugins: [],
};
