const { merge } = require("webpack-merge");
const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackBase = require("./webpack.base");

const setMPA = () => {
  const entryFiles = glob.sync(path.join(__dirname, "../src/**/index.ssr.jsx"));
  const entry = {};
  const htmlPlugins = [];

  entryFiles.forEach((item) => {
    const name = item.match(/src\/(.*)\/index.ssr.jsx$/)[1];
    entry[name] = item;

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public/index.html"),
        chunks: [`${name}`],
        filename: `${name}.html`,
        inject: true,
        minify: {
          removeComments: false,
        },
      }),
    );
  });

  return { entry, htmlPlugins };
};

const { entry, htmlPlugins } = setMPA();

module.exports = merge(webpackBase, {
  entry,
  mode: "production",
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: "ignore-loader",
  //     },
  //     {
  //       test: /\.less$/,
  //       use: "ignore-loader",
  //     },
  //   ],
  // },
  output: {
    filename: "js/[name].ssr.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "umd",
  },
  plugins: [...htmlPlugins],
});
