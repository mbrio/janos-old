import { expect } from 'chai';
import Server from '../../src/services/server/Server';

describe('Server', () => {
  it('should start and stop', done => {
    const server = new Server();

    server.start().then(() => {
      expect(server.httpServer.listening).to.equal(true);
      server.stop().then(() => {
        expect(server.httpServer.listening).to.equal(false);
        done();
      });
    });
  });
});
