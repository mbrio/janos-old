/* eslint-disable react/require-extension */

require('babel-register')();
const { default: Server } = require('./Server');
const { default: routes } = require('../../client/routes');
const { default: config } = require('../../../config');
const { default: DevelopmentPlugin } =
  require('./middleware/DevelopmentPlugin.jsx');
const { default: StaticPlugin } =
  require('./middleware/StaticPlugin.jsx');
const { default: AccessControlPlugin } =
  require('./middleware/AccessControlPlugin.jsx');
const { default: ReactPlugin } =
  require('./middleware/ReactPlugin.jsx');
const { default: ApiPlugin } =
  require('./middleware/ApiPlugin.jsx');
const { default: BuildPlugin } =
  require('./middleware/BuildPlugin.jsx');

// TODO: Figure out a much better solution for this.
const plugins = [
  DevelopmentPlugin,
  BuildPlugin,
  StaticPlugin,
  AccessControlPlugin,
  ApiPlugin,
  ReactPlugin,
];

const server = new Server({ routes, config, plugins });

console.log('Server starting...'); // eslint-disable-line no-console

server.start().then(() => {
  /* eslint-disable no-console */
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
  /* eslint-enable no-console */
});
