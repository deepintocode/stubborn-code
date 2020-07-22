module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-nesting"),
    require("autoprefixer"),
    require("@fullhuman/postcss-purgecss")({
      content: ["./_site/**/*.html"],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
  ],
};
