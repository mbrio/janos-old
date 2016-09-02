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
      expect(c.root.title)
        .toBe(example.__test.title); // eslint-disable-line no-underscore-dangle

      expect(() => { c.raw = 'bob'; }).toThrow(TypeError);
      expect(() => { c.environmentOverrides = 'bob'; }).toThrow(TypeError);
      expect(() => { c.root = 'bob'; }).toThrow(TypeError);
      expect(() => { c.options = 'bob'; }).toThrow(TypeError);

      expect(() => { c.raw.test = 'bob'; }).toThrow(TypeError);
      expect(() => { c.environmentOverrides.test = 'bob'; }).toThrow(TypeError);
      expect(() => { c.root.test = 'bob'; }).toThrow(TypeError);
      expect(() => { c.options.test = 'bob'; }).toThrow(TypeError);

      expect(() => { c.raw.title = 'bob'; }).toThrow(TypeError);
      expect(() => { c.environmentOverrides.title = 'bob'; }).toThrow(TypeError);
      expect(() => { c.root.title = 'bob'; }).toThrow(TypeError);
      expect(() => { c.options.title = 'bob'; }).toThrow(TypeError);
    });
  });

  describe('options', () => {
    it('should detect correct default environment', () => {
      expect(new Config().environment).toBe(defaultEnv);
    });

    it('should detect correct override environment', () => {
      expect(new Config({}, { environment: 'development' }).environment).toBe('development');
      expect(new Config({}, { environment: 'production' }).environment).toBe('production');
      expect(new Config({}, { environment: 'test' }).environment).toBe('test');
    });

    it('should detect correct default cwd', () => {
      expect(new Config().cwd).toBe(process.cwd());
    });

    it('should detect correct override cwd', () => {
      expect(new Config({}, { cwd: '/tmp' }).cwd).toBe('/tmp');
    });
  });

  describe('config', () => {
    describe('no environment override', () => {
      it('should retrieve configuration values', () => {
        const c = { somePath: '/tmp' };
        expect(new Config(c).root.somePath).toBe('/tmp');
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
        expect(new Config(c, { environment: 'test' }).root.somePath).toBe('/testtmp');
      });
    });
  });

  describe('path', () => {
    it('should append path to cwd', () => {
      const c = new Config({ somePath: '/app' }, { cwd: '/tmp' });

      expect(c.path(c.root.somePath)).toBe('/tmp/app');
      expect(c.path('inner', c.root.somePath)).toBe('/tmp/inner/app');
    });
  });

  describe('environment detection properties', () => {
    it('should detect correct environments', () => {
      let c = new Config({}, { environment: 'development' });
      expect(c.isDevelopment).toBe(true);
      expect(c.isProduction).toBe(false);
      expect(c.isTest).toBe(false);

      c = new Config({}, { environment: 'production' });
      expect(c.isDevelopment).toBe(false);
      expect(c.isProduction).toBe(true);
      expect(c.isTest).toBe(false);

      c = new Config({}, { environment: 'test' });
      expect(c.isDevelopment).toBe(false);
      expect(c.isProduction).toBe(false);
      expect(c.isTest).toBe(true);
    });
  });
});
