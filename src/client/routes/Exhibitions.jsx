import React from 'react';
import Helmet from 'react-helmet';
import WindowSizedComponent from '../containers/WindowSizedComponent';

@WindowSizedComponent
class Exhibitions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<div>
      <Helmet title="Exhibitions" />
      <h1>Exhibitions</h1>
    </div>);
  }
}

export default Exhibitions;
