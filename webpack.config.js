const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: {
    main: './src/index.js',
    'addon/index': './src/web-ext/',
    playground: './src/playground.js'
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js'
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [new UglifyJsPlugin()]
} else {
  config.devtool = 'inline-source-map'
  config.plugins = [
    new CopyWebpackPlugin([{ from: './src/web-ext/', to: 'addon' }]),
    new HtmlWebpackPlugin({
      template: 'playground.html',
      chunks: ['playground']
    })
  ]
}

module.exports = config
