const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          // Copy all files from content directory to dist/content (for build output)
          {
            from: path.resolve(__dirname, 'src/content'),
            to: path.resolve(__dirname, 'dist/content'),
          },
        ],
      }),
    ],
  },
});
