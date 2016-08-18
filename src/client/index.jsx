import { render } from 'react-dom';
import routes from './routes';

/* eslint-disable no-console */
console.log(`Initializing in ${process.env.NODE_ENV} mode.`);
/* eslint-enable no-console */

// Render our routes into the react-view HTML element.
render(routes, document.getElementById('react-view'));
