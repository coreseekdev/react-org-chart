const glob = require('glob')
const webpack = require('webpack')
const { resolve } = require('path')

const getFilename = path =>
  path
    .split('\\')
    .pop()
    .split('/')
    .pop()
    .replace('.js', '')

const getExamples = () => {
  return glob
    .sync('./src/examples/*.js', {
      matchBase: true
    })
    .map(getFilename)
    .map(filename => ({
      name: `example-${filename}`,
      value: `./src/examples/${filename}.js`
    }))
    .reduce((acc, o) => {
      acc[o.name] = o.value
      return acc
    }, {})
}

module.exports = {
  name: 'react-org-chart',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/index',
    ...getExamples()
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
