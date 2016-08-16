import { expect } from 'chai';
import Server from '../../src/services/server/Server';

describe('Server', () => {
  it('should start', done => {
    const server = new Server();

    expect(server).to.have.property('start');

    server.start().then(done);
  });
});
