/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iosPink: "#ff2d54",
        iosRed: "#ff3a30",
        iosBlue: "#007bff",
        iosLightGray: "#f2f2f7",
        iosGray: "#e5e5ea",
      },
    },
  },
  plugins: [],
};
