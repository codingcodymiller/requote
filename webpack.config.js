require('dotenv/config');
const path = require('path');
const zlib = require('zlib');
const glob = require('glob-all');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server', 'public');

const isDevelopment = process.env.NODE_ENV === 'development';

const PATHS = {
  public: path.join(serverPublicPath, 'assets'),
  client: clientPath
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    clientPath,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              isDevelopment && 'react-refresh/babel'
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  stats: 'minimal',
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description',
          content: 'A personal library to collect and share your favorite quotes from your favorite books.'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      favicon: path.join(serverPublicPath, 'favicon.ico'),
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
          <head>
            <title>ReQuote</title>
            ${htmlWebpackPlugin.tags.headTags}
            <link rel="stylesheet" href="/assets/reset.css">
            <link rel="stylesheet" href="/assets/balloon.min.css">
            <link rel="stylesheet" href="/assets/fontawesome.min.css">
          </head>
          <body class="bg-aqua-blue">
            <div id="root"></div>
            <div id="portal-root"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
      cache: true,
      base: '/'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
    }),
    new PurgeCSSPlugin({
      safelist: [/^glider-/, /^landing-/],
      paths: glob.sync([
        `${PATHS.client}/**/*`,
        `${PATHS.public}/**/*`
      ], { nodir: true })
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.EnvironmentPlugin(['TINYMCE_KEY']),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean)
};
