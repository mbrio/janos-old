const Server = require('../../src/services/server/Server');
const { expect } = require('chai');

describe('Server', () => {
  it('should start', done => {
    const server = new Server();

    expect(server).to.have.property('start');

    server.start().then(done);
  });
});
