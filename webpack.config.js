const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  }
}

module.exports = config