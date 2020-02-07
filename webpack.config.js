const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rules = [
  {
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }
];

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: { rules },
  resolve: { extensions: ['.ts', 'tsx', '.js'] },

  devServer: {
    contentBase: './dist',
    port: 5000
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};
