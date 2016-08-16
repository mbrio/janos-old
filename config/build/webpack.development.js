const webpack = require('webpack');
const createWebpackConfig = require('./webpack.base');

const config = createWebpackConfig();

config.debug = true;

config.entry.app.unshift(
  'webpack-dev-server/client?http://0.0.0.0:8080',
  'webpack/hot/only-dev-server'
);

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

config.module.loaders[0].loaders.unshift('react-hot');

module.exports = config;
