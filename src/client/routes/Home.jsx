import React from 'react';
import Helmet from 'react-helmet';
import autobind from 'autobind-decorator';
import WindowSizedComponent from '../containers/WindowSizedComponent';

/**
 * The home route, is composed with WindowSizedComponent so that it understands when the window is
 * resized.
 */
export class Home extends React.Component {
  static propTypes = {
    windowWidth: React.PropTypes.number.isRequired,
    windowHeight: React.PropTypes.number.isRequired,
  }

  state = {
    message: 'Hello, App!',
  }

  /**
   * The button click event handler, it is defined as an arrow function so that it is bound to the
   * instance of the component.
   *
   * @param {Object} e - The event object passed in by the browser.
   */
  @autobind
  handleClick(e) {
    e.preventDefault();

    this.setState({ message: Math.random() });
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div className="label">{this.state.message}</div>
        <div><button onClick={this.handleClick}>Click Me</button></div>
      </div>
    );
  }
}

export default WindowSizedComponent(Home);
