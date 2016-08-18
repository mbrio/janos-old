import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import reactIndexTemplate from '../../../lib/reactIndexTemplate';
import config from '../../../../config/config';

/**
 * Creates the middleware that handles rendering of the isomporphic React application.
 *
 * @param {element} routes - The React element that defines the routes of the application.
 * @return {function} - The generated express middleware
 */
export default function createReactRouter(routes) {
  /**
   * Renders the isomporphic React application.
   *
   * @param {Object} req - The express request
   * @param {Object} res - The express response
   */
  return (req, res) => {
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
        const reactComponent = renderToString(
          <RouterContext
            {...renderProps}
            createElement={(Component, props) =>
              <Component appConfig={config.c.client} {...props} />
            }
          />
        );

        const head = Helmet.rewind();

        const html = reactIndexTemplate(
          head.htmlAttributes.toString(),
          head.title.toString(),
          head.meta.toString(),
          head.link.toString(),
          reactComponent
        );

        res.status(200).send(html);

      // We could not find a matching route.
      } else {
        res.status(404).send('Not Found');
      }
    });
  };
}
