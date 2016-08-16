import React from 'react';

export default class App extends React.Component {
  doAsync() {
    return Promise.resolve();
  }

  render() {
    return <div>Hello, App!</div>;
  }
}
