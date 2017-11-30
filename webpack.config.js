const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: 'yanim.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}
