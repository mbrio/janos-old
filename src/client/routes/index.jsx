import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Exhibitions from './Exhibitions';

/**
 * Define our application's routes.
 */
export default <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="exhibitions" component={Exhibitions} />
  </Route>
</Router>;
