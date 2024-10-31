const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "src/index.js",
  plugins: [terser()],
  output: {
    format: "iife",
    file: "dist/custom-elements.js",
    sourcemap: true,
  },
};
