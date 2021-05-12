const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
let externals = _externals();
module.exports = {
    mode:'production',
    entry: {
        app: './webpackTest.js', // 入口， app表示output的name
    },
    // target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'  //生成了app.js
    },
    externals: externals,
    module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader'
              }
          },
          {test:/\.css$/,use:["style-loader","css-loader"]},
          {
            test:/\.(woff|woff2|eot|otf|ttf|svg)$/,
            use:[
              {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[ext]'
                }
              }
            ]
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[name].[ext]'
                }
              }
            ]
          }
      ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'static/index.html'),
      inject: 'head',
      title: 'webpack-test'
    })
  ]
};

function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}