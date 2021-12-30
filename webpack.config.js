const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'production',
  resolve: {
    fallback: {
      "fs": false,
      "stream": false,
      "path": false,
      "https": false,
      "http": false,
      "crypto": false,
      "os": false
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
