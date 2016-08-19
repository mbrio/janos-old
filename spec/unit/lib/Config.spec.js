import { expect } from 'chai';
import Config from '../../../src/lib/Config';

const defaultEnv = process.env.NODE_ENV || 'development';

const example = {
  title: 'Some Title',
  __test: {
    title: 'Some Title [TEST]',
  },
};

const exampleTest = [example, { environment: 'test' }];

describe('Config', () => {
  describe('immutability', () => {
    it('should have immutable properties', () => {
      const c = new Config(...exampleTest);
      expect(c.root.title).to.equal(example.__test.title); // eslint-disable-line no-underscore-dangle

      expect(() => { c.raw = 'bob'; }).to.throw(TypeError);
      expect(() => { c.environmentOverrides = 'bob'; }).to.throw(TypeError);
      expect(() => { c.root = 'bob'; }).to.throw(TypeError);
      expect(() => { c.options = 'bob'; }).to.throw(TypeError);

      expect(() => { c.raw.test = 'bob'; }).to.throw(TypeError);
      expect(() => { c.environmentOverrides.test = 'bob'; }).to.throw(TypeError);
      expect(() => { c.root.test = 'bob'; }).to.throw(TypeError);
      expect(() => { c.options.test = 'bob'; }).to.throw(TypeError);

      expect(() => { c.raw.title = 'bob'; }).to.throw(TypeError);
      expect(() => { c.environmentOverrides.title = 'bob'; }).to.throw(TypeError);
      expect(() => { c.root.title = 'bob'; }).to.throw(TypeError);
      expect(() => { c.options.title = 'bob'; }).to.throw(TypeError);
    });
  });

  describe('options', () => {
    it('should detect correct default environment', () => {
      expect(new Config()).to.have.property('environment', defaultEnv);
    });

    it('should detect correct override environment', () => {
      expect(new Config({}, { environment: 'development' })).to.have.property(
        'environment', 'development');
      expect(new Config({}, { environment: 'production' })).to.have.property(
        'environment', 'production');
      expect(new Config({}, { environment: 'test' })).to.have.property('environment', 'test');
    });

    it('should detect correct default cwd', () => {
      expect(new Config()).to.have.property('cwd', process.cwd());
    });

    it('should detect correct override cwd', () => {
      expect(new Config({}, { cwd: '/tmp' })).to.have.property('cwd', '/tmp');
    });
  });

  describe('config', () => {
    describe('no environment override', () => {
      it('should retrieve configuration values', () => {
        const c = { somePath: '/tmp' };
        expect(new Config(c)).to.have.deep.property('root.somePath', '/tmp');
      });
    });

    describe('environment override', () => {
      it('should retrieve configuration values', () => {
        const c = {
          somePath: '/tmp',
          __test: {
            somePath: '/testtmp',
          },
        };
        expect(new Config(c, { environment: 'test' })).to.have.deep.property(
          'root.somePath', '/testtmp');
      });
    });
  });

  describe('path', () => {
    it('should append path to cwd', () => {
      const c = new Config({ somePath: '/app' }, { cwd: '/tmp' });

      expect(c.path(c.root.somePath)).to.equal('/tmp/app');
      expect(c.path('inner', c.root.somePath)).to.equal('/tmp/inner/app');
    });
  });

  describe('environment detection properties', () => {
    it('should detect correct environments', () => {
      let c = new Config({}, { environment: 'development' });
      expect(c).to.have.property('isDevelopment', true);
      expect(c).to.have.property('isProduction', false);
      expect(c).to.have.property('isTest', false);

      c = new Config({}, { environment: 'production' });
      expect(c).to.have.property('isDevelopment', false);
      expect(c).to.have.property('isProduction', true);
      expect(c).to.have.property('isTest', false);

      c = new Config({}, { environment: 'test' });
      expect(c).to.have.property('isDevelopment', false);
      expect(c).to.have.property('isProduction', false);
      expect(c).to.have.property('isTest', true);
    });
  });
});
