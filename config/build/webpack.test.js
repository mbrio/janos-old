const createWebpackConfig = require('./webpack.base');

const config = createWebpackConfig();
config.debug = true;

module.exports = config;
