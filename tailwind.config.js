const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        brand: "Marske",
      },
      colors: {
        brandLight: "#a70c3d",
        brandDark: "#48051a",
      },
    },
  },
  variants: {},
  plugins: [],
};
