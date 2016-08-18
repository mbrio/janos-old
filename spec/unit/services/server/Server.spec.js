import { expect } from 'chai';
import Server from '../../../../src/services/server/Server';

describe('Server', () => {
  it('should start and stop', done => {
    const server = new Server();

    server.start().then(s => {
      expect(s).to.equal(server);
      expect(server.httpServer.listening).to.equal(true);
      server.stop().then(s => {
        expect(s).to.equal(server);
        expect(server.httpServer.listening).to.equal(false);
        done();
      });
    });
  });
});
