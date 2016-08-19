require('babel-register')();
const { default: Server } = require('./Server');
const routes = require('../../client/routes');
const config = require('../../../config');

const server = new Server({ routes, config });

console.log('Server starting...'); // eslint-disable-line no-console

server.start().then(() => {
  /* eslint-disable no-console */
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
  /* eslint-enable no-console */
});
