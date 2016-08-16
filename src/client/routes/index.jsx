import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';

export default <Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
</Router>;
