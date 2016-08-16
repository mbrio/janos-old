const React = require('react');

class App extends React.Component {
  doAsync() {
    return Promise.resolve();
  }

  render() {
    return <div>Hello, App!</div>;
  }
}

module.exports = App;
