const config = {
  entry: {
    background: "./src/background.ts",
    content: "./src/content.tsx",
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/extension",
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
};

module.exports = (env, argv) => {
  // Enable sourcemaps for debugging webpack's output.
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  return config;
};
