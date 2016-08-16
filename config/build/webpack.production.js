const createWebpackConfig = require('./webpack.base');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const config = createWebpackConfig();
config.plugins.push(new UglifyJsPlugin());

module.exports = config;
