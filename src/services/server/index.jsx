import Server from './Server';
import routes from '../../client/routes';

/**
 * Starts the isomorphic web server.
 *
 * @return {Promise} - Returns the promise associated with starting the server.
 */
export default function startServer() {
  const server = new Server({ routes });

  return server.start().then(() => {
    /* eslint-disable no-console */
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
    /* eslint-enable no-console */
  });
}
