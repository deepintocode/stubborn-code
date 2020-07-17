const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        brand: "Marske",
        code: "Fira Code",
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
