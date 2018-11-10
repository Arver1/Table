const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
};


const conf = {
  context: PATHS.source,
  entry: './index.js',

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: PATHS.source,
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      }
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin({})
  ]
};

module.exports = (env, argv) => {
  if(argv.mode === 'development') {
    conf.devtool = 'source-map';
    conf.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: "css-loader", options: {
            sourceMap: true
          }
        },
        'postcss-loader',
        {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }
      ],
    });
    return conf;
  }
  conf.devtool = false;
  conf.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
  });
  return conf;
};
