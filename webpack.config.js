const path = require('path')

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
  plugins: [],
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
