module.exports = function devMiddleware(publicPath) {
  const livereload = require('livereload').createServer();
  livereload.server.once('connection', () => {
    setTimeout(() => livereload.sendAllClients(JSON.stringify({
      command: 'reload',
      path: '/'
    })), 100);
  });
  livereload.watch(publicPath);
  const webpack = require('webpack')(require('../webpack.config'));
  return [
    require('connect-livereload')(),
    require('webpack-dev-middleware')(webpack),
    require('webpack-hot-middleware')(webpack),
    require('express').static(publicPath)
  ];
};
