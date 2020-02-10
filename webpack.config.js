// insert bundle.js inside index.html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// extract css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// minify JS
const TerserJSPlugin = require('terser-webpack-plugin')
// minify CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './bundle.js'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
     template: './src/index.html',
     inject: 'body'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: true,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "./public"),
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    watchContentBase: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map",
}

module.exports = config