const reactIndexTemplate = require('../../src/lib/reactIndexTemplate');
const VirtualFilePlugin = require('../../src/lib/build/VirtualFilePlugin');
const config = require('./webpack.config');

config.plugins.push(
  new VirtualFilePlugin({
    template: () => reactIndexTemplate('', '', '', '', ''),
  })
);

module.exports = config;
