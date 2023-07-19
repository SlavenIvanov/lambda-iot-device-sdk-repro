const slsw = require("serverless-webpack");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  node: {
    __dirname: true,
  },
  target: "node",
  mode: dev ? "none" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.(ts|js)x?$/, exclude: /node_modules/, use: ["ts-loader"] },
      // TODO possible to use node-loader to load native modules
      // {
      //   test: /\.node$/,
      //   loader: "node-loader",
      //   options: {
      //     name: "[path][name].[ext]",
      //   },
      // },
    ],
  },
  stats: {
    preset: "minimal",
  },
};
