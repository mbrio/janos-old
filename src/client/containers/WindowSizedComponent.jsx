import React from 'react';
import throttle from 'lodash.throttle';

export default (ComposedComponent) => class extends React.Component {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }

  constructor(props, context) {
    super(props, context);

    this.handleResize = throttle(this.handleResize.bind(this), 200);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <ComposedComponent
        {...this.props}
        windowWidth={this.state.windowWidth}
        windowHeight={this.state.windowHeight}
      />
    );
  }
};
