import httputil from 'http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

const defaultOptions = {
  throwUnhandledRejection: true,
  port: process.env.PORT || 3001,
};

export default class Server {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    const { routes, throwUnhandledRejection } = this.options;

    this.app = express();
    /* eslint-disable new-cap */
    this.httpServer = httputil.Server(this.app);
    /* eslint-enable new-cap */

    if (throwUnhandledRejection) {
      process.on('unhandledRejection', (error) => {
        throw error;
      });
    }

    this.app.use((req, res) => {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
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
                <script src="/app.js"></script>
              </body>
            </html>
          `;

          res.status(200).send(html);
        } else {
          res.status(404).send('Not found');
        }
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.options.port, err => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }
}
