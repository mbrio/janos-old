import httputil from 'http';
import express from 'express';
import chokidar from 'chokidar';
import pathutil from 'path';
import webpackBuild from '../../lib/build/webpackBuild';
import webpackConfig from '../../../config/build/webpack.config';
import accessControl from './middleware/accessControl';
import createReactRouter from './middleware/createReactRouter';
import createApiRouter from './api';

// Default options for the Server class
const defaultOptions = {
  throwUnhandledRejection: true,
  port: process.env.PORT || 8080,
  cwd: process.cwd(),
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
 * * @param {Config} options[].config - The Config instance for the server.
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    const { routes, throwUnhandledRejection, config } = this.options;

    // Check to see if our options meet application requirements
    if (!config) { throw new Error('No config supplied in options.'); }
    if (!routes) { throw new Error('No routes supplied in options.'); }

    this.config = config;

    // Stops Promises from swalling exceptions caused by reject that were not handled.
    if (throwUnhandledRejection) {
      process.on('unhandledRejection', (error) => { throw error; });
    }

    // Setup express & http server
    this.app = express();
    /* eslint-disable new-cap */
    this.httpServer = httputil.Server(this.app);
    /* eslint-enable new-cap */

    // Setup static serving of files within the assets folder.
    this.app.use(express.static(pathutil.join(__dirname, '..', '..', 'assets')));

    // Setup access control headers
    this.app.use(accessControl);

    // Setup the API that servers our application code
    this.app.use(createApiRouter('/api'));

    // Setup the global handler for handling isomporphic rendering of React components
    this.app.use(createReactRouter(routes, config));
  }

  buildDeps() {
    return webpackBuild(webpackConfig).then(stats => {
      if (process.env.NODE_ENV === 'development') {
        console.log(stats.toString()); // eslint-disable-line no-console
      }
    });
  }

  startWatching() {
    if (this.watcher) { throw new Error('Already watching for changes.'); }

    // Begin watching the src directory
    this.watcher = chokidar.watch(pathutil.join(this.options.cwd, 'src'), {
      ignored: [
        /[\/\\]\./, // Exclude dot files
        // TODO: Build this from config data
        /[\/\\]src[\/\\]assets[\/\\]build/, // Exclude our build files
      ],
      ignoreInitial: true,
    })
      .on('all', () => { // On all file events
        process.exit();
      });
  }

  stopWatching() {
    if (!this.watcher) { return; }

    this.watcher.close();
  }

  /**
   * Start the http server.
   *
   * @return {Promise} - The promise associated with starting the http server.
   */
  start() {
    if (process.env.NODE_ENV === 'development') { this.startWatching(); }

    return this.buildDeps().then(() => new Promise((resolve, reject) => {
      this.httpServer.listen(this.options.port, err => {
        if (err) { return reject(err); }
        return resolve(this);
      });
    }));
  }

  /**
   * Stop the http server.
   *
   * @return {Promise} - The promise associated with stoping the http server.
   */
  stop() {
    this.stopWatching();

    return new Promise((resolve, reject) => {
      this.httpServer.close(err => {
        if (err) { return reject(err); }
        return resolve(this);
      });
    });
  }
}
