import { expect } from 'chai';
import { start, stop } from '../../../../src/services/server';

describe('index', () => {
  it('should start and stop the web server', done => {
    start()
      .then(s => {
        expect(s.httpServer.listening).to.equal(true);

        stop().then(is => {
          expect(s).to.equal(is);
          expect(s.httpServer.listening).to.equal(false);
          done();
        });
      });
  });
});
