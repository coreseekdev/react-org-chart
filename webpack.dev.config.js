const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  name: 'react-org-chart',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/index',
    exampleSimple: './src/examples/simple',
    exampleReact: './src/examples/react'
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: resolve(__dirname, 'src'),
      manifest: resolve(__dirname, 'dist/manifest.json')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
