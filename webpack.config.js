const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './index.ts',
  target: "webworker",
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    fallback: {
      "fs": false,
      "stream": false,
      "path": false,
      "https": false,
      "http": false,
      "crypto": false,
      "os": false,
      "url": false,
      "util": false
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
}
