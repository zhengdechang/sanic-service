/*
 * @Author: Devin
 * @Date: 2023-08-10 14:04:19
 * @Description: file content
 */
'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 这里为什么不是 '../public/index.html'?
      // 我的理解是无论与要用的 template 是不是在一个目录，都是从根路径开始查找
      template: 'public/index.html',
      inject: 'body',
      favicon: path.resolve('public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      as: 'script',
      include: 'asyncChunks',
      fileBlacklist: [/\index.css|index.js|vendors.js/, /\.whatever/],
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!js'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
  optimization: {
    sideEffects: true, //配合 tree shaking
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        test: /\.js(\?.*)?$/i,
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 3,
          chunks: 'initial',
        },
        framework: {
          test: 'framework',
          name: 'framework',
          priority: 10,
          enforce: true,
        },
        vendors: {
          test: /node_modules/,
          name: 'vendor',
          priority: -10,
          enforce: true,
        },
      },
    },
  },
})
