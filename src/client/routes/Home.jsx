import React from 'react';
import autobind from 'autobind-decorator';

export default class Home extends React.Component {
  state = {
    message: 'Hello, App!',
  };

  @autobind
  handleClick(e) {
    e.preventDefault();

    this.setState({ message: Math.random() });
  }

  render() {
    return (<div>
      <div>{this.state.message}</div>
      <div><button onClick={this.handleClick}>Click Me</button></div>
    </div>);
  }
}
