const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectRoot = Path.resolve(__dirname);
const srcDir = Path.join(projectRoot, 'src');
const destDir = Path.join(projectRoot, 'dest');

module.exports = {
  entry: Path.join(srcDir, 'index'),
  output: {
    path: destDir,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(srcDir, 'index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ],
    },
  },
};
