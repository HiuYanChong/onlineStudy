const path = require('path');

module.exports = {
  entry: {
    home: './app/views/page/home/home.js',
    person: './app/views/page/person/person.js',
    lesson: './app/views/page/lesson/lesson.js',
    search: './app/views/page/search/search.js',
    vendor: [
      'vue', 'element-ui',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      widget: 'app/views/widget',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
}

