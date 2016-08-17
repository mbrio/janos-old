import httputil from 'http';
import express from 'express';
import React from 'react';
import pathutil from 'path';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

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
    this.app.use(express.static(pathutil.join(__dirname, '..', '..', 'assets')));

    // Setup the global handler for handling isomporphic rendering of React components
    this.app.use((req, res) => {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        // If we have an error, respond with 500. If we are in production mode do not send the
        // error message.
        if (error) {
          const response = res.status(500);
          if (process.env.NODE_ENV !== 'production') {
            response.send(error.message);
          } else {
            response.send('Internal Server Error');
          }

        // Redirect if we must
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);

        // Attempt to render the initial React component
        } else if (renderProps) {
          const reactComponent = renderToString(<RouterContext {...renderProps} />);

          const html = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title></title>
              </head>
              <body>
                <div id="react-view">${reactComponent}</div>
                <script src="/build/app.js"></script>
              </body>
            </html>
          `;

          res.status(200).send(html);

        // We could not find a matching route.
        } else {
          res.status(404).send('Not Found');
        }
      });
    });
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
