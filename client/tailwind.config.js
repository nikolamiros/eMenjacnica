module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "app/screens/**/*.{js,jsx,ts,tsx}",
    "app/pages/**/*.{js,jsx,ts,tsx}",
    "app/components/**/*.{js,jsx,ts,tsx}",
  ],
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
