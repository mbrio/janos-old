require('babel-register')();
const Server = require('./Server');
const routes = require('../../client/routes');

const server = new Server({ routes });

server.start().then(() => {
  /* eslint-disable no-console */
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
  /* eslint-enable no-console */
});
