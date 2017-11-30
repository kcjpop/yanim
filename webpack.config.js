const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    main: './src/index.js',
    playground: './src/playground.js'
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'playground.html',
      chunks: ['playground']
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [new UglifyJsPlugin()]
}

module.exports = config
