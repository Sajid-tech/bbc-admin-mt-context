/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        scale: 'scale 0.9s ease-in-out infinite',
      },
      keyframes: {
        scale: {
          '0%, 40%, 100%': { transform: 'scaleY(0.05)' },
          '20%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
});

