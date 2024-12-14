import TerserPlugin from "terser-webpack-plugin";

const config = {
  mode: "development", // Режим для отладки
  entry: {
    index: "./src/js/index.js", // Точка входа для index.bundle.js
    forms: "./src/js/forms.js", // Точка входа для forms.bundle.js
  },
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"], // Указываем расширения файлов по умолчанию, для файлов без явного указания расширения
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, // Не создаем LICENSE.txt
      }),
    ],
  },
  devtool: "source-map", // Включить sourcemap
};

export default config;
