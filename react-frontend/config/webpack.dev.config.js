/*
 * @Author: Devin
 * @Date: 2023-08-10 14:04:19
 * @Description: file content
 */
'use strict'
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    quiet: true,

    proxy: {
      '/api': {
        //这里最好有一个 /
        target: 'http://127.0.0.1:8000', // 后台接口域名
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React template',
      template: 'public/index.html',
      inject: 'body',
      hash: false,
      favicon: path.resolve('public/favicon.ico'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
      },
      onErrors: function (severity, errors) {
        console.log('severity, errors: ', severity, errors)
        return severity
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      clearConsole: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
