require('babel-register')();
const { fork } = require('child_process');
const { default: config } = require('./config');

let started = false;

function startServer(restart = false) {
  if (started) {
    console.log('Server restarting...'); // eslint-disable-line no-console
  }

  started = true;
  const proc = fork('./src/services/server/', {}, { env: process.env });

  if (restart) {
    proc.on('exit', () => startServer(restart));
  }
}

startServer(config.isDevelopment);
