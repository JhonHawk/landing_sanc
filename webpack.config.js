const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

const metaTags = {
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
};

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtracPlugin.loader,
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("autoprefixer")];
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      template: "./src/index.html",
      meta: metaTags,
    }),
    new HtmlWebpackPlugin({
      filename: "pages/test.html",
      title: "test",
      template: "./src/pages/test.html",
      meta: metaTags,
    }),
    new MiniCssExtracPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/images", to: "assets/images" },
        { from: "./src/assets/video", to: "assets/video" },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
