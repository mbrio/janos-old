const Server = require('../../src/Server');
const {expect} = require('chai');

describe('Server', () => {
  it('should instantiate', () => {
    const server = new Server();

    expect(server).to.have.property('start');
  });
});
