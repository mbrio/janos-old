import Server from './Server';

export default function startServer() {
  const server = new Server();

  server.start().then(() => {
    /* eslint-disable no-console */
    console.log('Server started.');
    /* eslint-enable no-console */
  });
}
