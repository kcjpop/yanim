/* eslint-env node */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './src/index.js',
    'addon/index': './src/web-ext/',
    playground: './src/playground.js'
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './src/web-ext/', to: 'addon' }]),
    new HtmlWebpackPlugin({
      template: 'playground.html',
      chunks: ['playground']
    })
  ]
}
