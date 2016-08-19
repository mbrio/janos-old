import pathutil from 'path';
import i from 'seamless-immutable';

const defaultOptions = {
  cwd: process.cwd(),
  environment: process.env.NODE_ENV || 'development',
};

/**
 * Holds and processes configuration based on the current environment.
 */
export default class Config {
  constructor(config = {}, options = {}) {
    // Apply supplied options to default and store an immutable copy.
    const o = i(Object.assign({}, defaultOptions, options));
    Object.defineProperty(this, 'options', { get: () => o });

    // Store an immutable copy of the raw config
    const raw = i(Object.assign({}, config));
    Object.defineProperty(this, 'raw', { get: () => raw });

    // Store an immutable copy of the raw environment override
    const environmentOverrides = i(Object.assign({}, config[`__${this.environment}`] || {}));
    Object.defineProperty(this, 'environmentOverrides', { get: () => environmentOverrides });

    // Apply the environment override to the raw config
    const root = i(Object.assign({}, raw, environmentOverrides));
    Object.defineProperty(this, 'root', { get: () => root });
  }

  /**
   * Joins the path elements to cwd
   *
   * @param {Array} path - The path elements to be appended to cwd.
   * @return {string} - The new, concatenated path
   */
  path(...path) {
    return pathutil.join(this.cwd, ...path);
  }

  /**
   * Gets the cwd for configuration.
   *
   * @return {string}
   */
  get cwd() {
    return this.options.cwd;
  }

  /**
   * Gets the current environment
   *
   * @return {string}
   */
  get environment() {
    return this.options.environment;
  }

  /**
   * Gets whether we are in the development environment
   *
   * @return {Boolean}
   */
  get isDevelopment() {
    return this.environment === 'development';
  }

  /**
   * Gets whether we are in the production environment
   *
   * @return {Boolean}
   */
  get isProduction() {
    return this.environment === 'production';
  }

  /**
   * Gets whether we are in the test environment
   *
   * @return {Boolean}
   */
  get isTest() {
    return this.environment === 'test';
  }
}
