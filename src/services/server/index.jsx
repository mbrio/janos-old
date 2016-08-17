import Server from './Server';
import routes from '../../client/routes';

export default function startServer() {
  const server = new Server({ routes });

  server.start().then(() => {
    /* eslint-disable no-console */
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${server.options.port}.`);
    /* eslint-enable no-console */
  });
}
