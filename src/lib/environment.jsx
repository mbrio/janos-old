module.exports = class Environment {
  static get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  static get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }

  static get isTest() {
    return process.env.NODE_ENV === 'test';
  }
};
