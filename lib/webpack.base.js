const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const glob = require("glob");

const projectRoot = process.cwd();

const setMPA = () => {
  const entryFiles = glob.sync(path.join(projectRoot, "../src/**/index.jsx"));
  const entry = {};
  const htmlPlugins = [];

  entryFiles.forEach((item) => {
    const name = item.match(/src\/(.*)\/index.jsx$/)[1];
    entry[name] = item;

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, "../public/index.html"),
        chunks: [`${name}`],
        filename: `${name}.html`,
      }),
    );
  });

  return { entry, htmlPlugins };
};

const { entry, htmlPlugins } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          "eslint-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // rem的单位
              remPrecision: 6, // 计算后的rem小数点保留精度位数
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["last 2 version", "> 1%", "ios 7"],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // rem的单位
              remPrecision: 6, // 计算后的rem小数点保留精度位数
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["last 2 version", "> 1%", "ios 7"],
                }),
              ],
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|fon|font|ttf|ttc|woff)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css" }),
    new CleanWebpackPlugin(),
    new FriendlyErrorWebpackPlugin(),
  ].concat(htmlPlugins),
  stats: "errors-only",
};
