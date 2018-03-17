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
    .map(path => {
      const filename = getFilename(path)

      return {
        name: `example-${filename}`,
        value: `./src/examples/${filename}.js`
      }
    })
    .reduce((acc, o) => {
      acc[o.name] = o.value
      return acc
    }, {})
}

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
      ...getExamples()
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
