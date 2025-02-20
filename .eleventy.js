module.exports = function (eleventyConfig) {
  // README.md is the only file that will be built. Set global data to force it
  // to be displayed as the index page.
  eleventyConfig.addGlobalData("permalink", "index.html");
  eleventyConfig.addGlobalData("layout", "layout.njk");

  return {
    dir: {
      output: "dist",
    },
  };
};
