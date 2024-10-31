const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "src/index.js",
  plugins: [terser()],
  output: {
    file: "dist/custom-elements.js",
    sourcemap: true,
  },
};
