/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#069494",
        primary100: "#cafdf7",
        primary200: "#94fbf0",
        primary300: "#57f1e7",
        primary400: "#25dcd5",
        primary500: "#0cc0bc",
        modal: "rgba(0, 0, 64, .7)",

      },
      animation: {
        fadeIn: "fadeIn 0.1s linear both",
        modalSlideIn: "modalSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both",
      },
      keyframes: {
        fadeIn: {
          to: {
            opacity: 1,
            pointerEvents: "initial",
          },
        },
        modalSlideIn: {
          to: {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
}

