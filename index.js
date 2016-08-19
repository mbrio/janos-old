require('babel-register')();
const forever = require('forever');
const { default: config} = require('./config/config');

console.log(config.c);

WORK ON GETTING FOREVER TO RUN OUR APPLICATION WHEN IN DEVELOPMENT MODE
// forever.start('./src/services/server');
