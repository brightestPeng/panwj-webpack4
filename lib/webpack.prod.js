const { merge } = require("webpack-merge");
const path = require("path");
const cssnano = require("cssnano");
// css压缩
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 引入cdn
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const webpackBase = require("./webpack.base");

// 获取当前工作目录
const projectRoot = process.cwd();

module.exports = merge(webpackBase, {
  devtool: "source-map",
  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: path.resolve(projectRoot, "../dist"),
  },
  mode: "production",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /react-dom/, // 正则规则验证，如果符合就提取 chunk
          name: "vendor",
        },
      },
    },
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry:
            "https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js",
          global: "React",
        },
      ],
    }),
  ],
});
