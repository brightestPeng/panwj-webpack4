const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    filename: "js/[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    port: 3000,
  },
  devtool: "eval-cheap-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
