const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  // Function to count words of posts
  eleventyConfig.addFilter("wordCount", function (value) {
    const numOfWords = value.split(/\s+/).length;
    const WORDS_PER_MINUTE = 250;
    const minsToRead = Math.round(numOfWords / WORDS_PER_MINUTE);
    return `${minsToRead} mins to read`;
  });
  // YouTube Links Plugin
  eleventyConfig.addPlugin(embedYouTube);
  // Copy `css/fonts/` to `_site/css/fonts`
  eleventyConfig.addPassthroughCopy("css/fonts");
  // Find and copy any `png` files, maintaining directory structure.
  eleventyConfig.setTemplateFormats(["md", "liquid", "png", "mp4"]);
};
