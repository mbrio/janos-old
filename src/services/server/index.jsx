import Server from './Server';
import routes from '../../client/routes';

let server = null;

/**
 * Starts the isomorphic web server.
 *
 * @return {Promise} - Returns the promise associated with starting the server.
 */
export function start() {
  if (server) { throw new Error('The server is already started.'); }
  server = new Server({ routes });

  return server.start().then(s => {
    /* eslint-disable no-console */
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
    /* eslint-enable no-console */

    return s;
  });
}

/**
 * Stops the isomorphic web server.
 *
 * @return {Promise} - Returns the promise associated with stopping the server.
 */
export function stop() {
  if (!server) { throw new Error('The server has not started.'); }

  return server.stop().then(s => {
    server = null;
    /* eslint-disable no-console */
    console.log('Server stopped.');
    /* eslint-enable no-console */

    return s;
  });
}
