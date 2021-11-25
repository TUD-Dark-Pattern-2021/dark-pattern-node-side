const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");

// const smp = new SpeedMeasurePlugin();


module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  mode: 'development',

  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true'
    ]
  },

  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
            },
          },
        ],
      },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }
    ],
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});
