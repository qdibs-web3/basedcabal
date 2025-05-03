const { override, addWebpackAlias, addWebpackResolve, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");
const path = require("path");

module.exports = override(
  // Add fallbacks for node core modules
  addWebpackResolve({
    fallback: {
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url"),
      process: require.resolve("process/browser"), // Added process here as well
    },
  }),
  // Add plugins
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  ),
  // Add alias (though ProvidePlugin might cover process, this ensures compatibility)
  addWebpackAlias({
    "process/browser": path.resolve(__dirname, "node_modules/process/browser.js"),
  })
);

