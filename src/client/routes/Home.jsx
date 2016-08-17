import React from 'react';
import WindowSizedComponent from '../containers/WindowSizedComponent';

@WindowSizedComponent
export default class Home extends React.Component {
  static propTypes = {
    windowWidth: React.PropTypes.number.isRequired,
    windowHeight: React.PropTypes.number.isRequired,
  }

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
      <div>{this.props.windowWidth}x{this.props.windowHeight}</div>
      <div><button onClick={this.handleClick}>Click Me</button></div>
    </div>);
  }
}
