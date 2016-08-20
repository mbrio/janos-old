import httputil from 'http';
import express from 'express';
import pseries from '../../lib/pseries';

// Default options for the Server class
const defaultOptions = {
  throwUnhandledRejection: true,
  port: process.env.PORT || 8080,
  cwd: process.cwd(),
  plugins: [],
};

/**
 * The isomorphic web server.
 */
export default class Server {
  /**
   * Initialize all components of the server.
   *
   * @param {Object[]} options - The options that describe how the server should start.
   * @param {boolean} options[].throwUnhandledRejection - Rethrow unhandled Promise rejections.
   * @param {number} options[].port - The port to start the server on.
   * @param {element} options[].routes - The React element describing the routes.
   * @param {Config} options[].config - The Config instance for the server.
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    const { routes, throwUnhandledRejection, config, plugins } = this.options;

    // Check to see if our options meet application requirements
    if (!config) { throw new Error('No config supplied in options.'); }
    if (!routes) { throw new Error('No routes supplied in options.'); }

    this.config = config;
    this.routes = routes;

    // Stops Promises from swalling exceptions caused by reject that were not handled.
    if (throwUnhandledRejection) {
      process.on('unhandledRejection', (error) => { throw error; });
    }

    // Setup express & http server
    this.app = express();
    /* eslint-disable new-cap */
    this.httpServer = httputil.Server(this.app);
    /* eslint-enable new-cap */

    // Instantiate our plugins
    this.plugins = (plugins || []).map(Plugin => new Plugin(this));
  }

  /**
   * Start the http server.
   *
   * @return {Promise} - The promise associated with starting the http server.
   */
  start() {
    const plugins = [
      ...this.plugins.map(p => () => p.start(this)), // Start all plugins
      () => new Promise((resolve, reject) => { // Start the web server
        this.httpServer.listen(this.options.port, err => {
          if (err) { return reject(err); }
          return resolve(this);
        });
      }),
    ];

    return pseries(plugins);
  }

  /**
   * Stop the http server.
   *
   * @return {Promise} - The promise associated with stoping the http server.
   */
  stop() {
    const plugins = [
      ...this.plugins.map(p => () => p.stop(this)), // Stop all plugins
      new Promise((resolve, reject) => { // Stop the web server
        this.httpServer.close(err => {
          if (err) { return reject(err); }
          return resolve(this);
        });
      }),
    ];

    return pseries(plugins);
  }
}
