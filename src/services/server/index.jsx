import Server from './Server';
import routes from '../../shared/routes';

export default function startServer() {
  const server = new Server({ routes });

  server.start().then(() => {
    /* eslint-disable no-console */
    console.log('Server started.');
    /* eslint-enable no-console */
  });
}
