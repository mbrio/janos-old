import pathutil from 'path';

const defaultOptions = {
  cwd: process.cwd(),
  environment: process.env.NODE_ENV || 'development',
};

/**
 * Holds and processes configuration based on the current environment.
 */
export default class Config {
  constructor(config = {}, options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.raw = config;
    this.environmentOverrides = config[`__${this.environment}`] || {};
    this.c = Object.assign({}, this.raw, this.environmentOverrides);
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
