const webpack = require("webpack");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for node core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        assert: require.resolve("assert"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url"),
        process: require.resolve("process/browser"),
      };

      // Add plugins
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        })
      );

      // Resolve the process/browser issue
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "process/browser": path.resolve(
          __dirname,
          "node_modules/process/browser.js"
        ),
      };

      return webpackConfig;
    },
  },
};
