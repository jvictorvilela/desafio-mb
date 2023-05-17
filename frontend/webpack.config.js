const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: '/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public/assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../public/assets/js'),
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};