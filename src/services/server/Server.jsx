import httputil from 'http';
import express from 'express';
import pathutil from 'path';
import accessControl from './middleware/accessControl';
import createReactRouter from './middleware/createReactRouter';
import createApi from './api';

// Default options for the Server class
const defaultOptions = {
  throwUnhandledRejection: true,
  port: process.env.PORT || 8080,
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
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    const { routes, throwUnhandledRejection } = this.options;

    // Setup express & http server
    this.app = express();
    /* eslint-disable new-cap */
    this.httpServer = httputil.Server(this.app);
    /* eslint-enable new-cap */

    // Stops Promises from swalling exceptions caused by reject that were not handled.
    if (throwUnhandledRejection) {
      process.on('unhandledRejection', (error) => { throw error; });
    }

    // Setup static serving of files within the assets folder.
    this.app.use(
      express.static(
        pathutil.join(__dirname, '..', '..', 'assets'),
        { index: false }
      )
    );

    // Setup access control headers
    this.app.use(accessControl);

    // Setup the API that servers our application code
    createApi(this.app, '/api');

    // Setup the global handler for handling isomporphic rendering of React components
    this.app.use(createReactRouter(routes));
  }

  /**
   * Start the http server.
   *
   * @return {Promise} - The promise associated with starting the http server.
   */
  start() {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.options.port, err => {
        if (err) { return reject(err); }
        return resolve();
      });
    });
  }

  /**
   * Stop the http server.
   *
   * @return {Promise} - The promise associated with stoping the http server.
   */
  stop() {
    return new Promise((resolve, reject) => {
      this.httpServer.close(err => {
        if (err) { return reject(err); }
        return resolve();
      });
    });
  }
}
