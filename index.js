require('babel-register')({ presets: ['es2015', 'stage-0'] });
const startServer = require('./src/services/server').default;

startServer();
