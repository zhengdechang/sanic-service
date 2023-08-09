/*
 * @Author: Devin
 * @Date: 2023-08-10 14:04:19
 * @Description: file content
 */
'use strict'

const path = require('path')
const os = require('os')
const defaultSettings = require('../src/settings.js')
const webpack = require('webpack')
const TimeFixPlugin = require('time-fix-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HappyPack = require('happypack') // 多线程打包工具
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const name = defaultSettings.title || 'React' // page title
module.exports = {
  entry: {
    app: './src/main.js',
    // framework: ['react', 'react-dom'],
  },
  output: {
    publicPath: '/',
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  name: name,
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx'],
    alias: {
      '@': path.join(__dirname, '..', 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, '../src')],
      },

      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/',
          },
        },
      },
    ],
  },
  plugins: [
    new TimeFixPlugin(),
    new WebpackBar({
      name: 'Build',
      profile: true,
      reporters: ['basic', 'fancy', 'profile'],
    }),
    // new webpack.ProgressPlugin({
    //   entries: true,
    //   modules: true,
    //   modulesCount: 100,
    //   profile: true,
    //   handler: (percentage, message, ...args) => {
    //     // custom logic
    //     console.info(percentage, message, ...args)
    //   },
    // }),
    new HardSourceWebpackPlugin(),
    //开启 happypack 的线程池
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /dayjs$/),
  ],
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    removeAvailableModules: true, // 删除已解决的 chunk
    removeEmptyChunks: true, // 删除空的 chunks
    mergeDuplicateChunks: true, // 合并重复的 chunk
  },
}
