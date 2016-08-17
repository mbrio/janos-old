import React from 'react';

export default class Home extends React.Component {
  state = {
    message: 'Hello, App!',
  }

  handleClick = (e) => {
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
