const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          // Copy to dist root (for build output)
          { from: path.resolve(__dirname, 'content.yaml'), to: '' },
          // Optionally copy to public folder (for dev server or static access)
          {
            from: path.resolve(__dirname, 'content.yaml'),
            to: path.resolve(__dirname, 'public/content.yaml'),
          },
        ],
      }),
    ],
  },
});
