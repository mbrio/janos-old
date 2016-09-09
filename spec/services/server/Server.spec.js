import Server from '../../../src/services/server/Server';
import config from '../../../config';
import routes from '../../../src/client/routes';

describe('Server', () => {
  it('should start and stop', done => {
    const server = new Server({
      config,
      routes,
    });

    server.start()
      .then(s => {
        expect(s).toBe(server);
        expect(server.httpServer.listening).toBe(true);
      })
      .then(() => {
        server.stop().then(s => {
          expect(s).toBe(server);
          expect(server.httpServer.listening).toBe(false);
          done();
        });
      });
  });
});
