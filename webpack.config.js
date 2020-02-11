const path = require("path");

module.exports = {
  entry: "./dist/index.js",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  }
};
