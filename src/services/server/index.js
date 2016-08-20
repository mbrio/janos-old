require('babel-register')();
const { default: Server } = require('./Server');
const { default: routes } = require('../../client/routes');
const { default: config } = require('../../../config');
const { default: Development } = require('./middleware/Development.jsx'); // eslint-disable-line

const plugins = [
  new Development(),
];

const server = new Server({ routes, config, plugins });

console.log('Server starting...'); // eslint-disable-line no-console

server.start().then(() => {
  /* eslint-disable no-console */
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
  /* eslint-enable no-console */
});
