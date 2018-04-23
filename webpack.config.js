const path = require('path');

module.exports = {
  entry: './src/dashboard.js',
  output: {
    path: path.resolve(__dirname, 'static', 'js'),
    filename: 'dashboard.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-vue-jsx'],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
        },
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
