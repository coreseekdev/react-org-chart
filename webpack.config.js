const webpack = require('webpack')
const { resolve } = require('path')

module.exports = [
  {
    name: 'vendor',
    entry: ['./src/vendor/example'],
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'vendor.bundle.js',
      library: 'vendor'
    },
    plugins: [
      new webpack.DllPlugin({
        name: 'vendor',
        path: resolve(__dirname, 'dist/manifest.json')
      })
    ]
  },
  {
    name: 'react-org-chart',
    dependencies: ['vendor'],
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
]
