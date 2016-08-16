require('babel-register')();
const { default: start } = require('./src/services/server');

start();
