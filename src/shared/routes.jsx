import React from 'react';
import { Router, Route } from 'react-router';
import App from '../client/routes/App';

export default <Router>
  <Route path="/" component={App} />
</Router>;
