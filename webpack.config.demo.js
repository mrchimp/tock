const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/demo/index.js",
  output: {
    filename: "demo/index.js",
  },
  optimization: {
    minimize: false,
    // minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    port: 9000,
    static: {
      directory: path.join(__dirname, "dist/demo"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
