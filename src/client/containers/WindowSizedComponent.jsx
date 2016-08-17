import React from 'react';
import throttle from 'lodash.throttle';

/**
 * An HOC for providing window resize features to a composed component. It provides two react
 * props, windowWidth and windowHeight, that correspond to the current size of the window.
 *
 * @example
 * const { windowWidth, windowHeight } = this.props;
 * <div>Current Window Size: {windowWidth}X{windowHeight}</div>
 *
 * @param {element} ComposedComponent - The element to compose
 * @return {class} - A new component class composed with window size features
 */
export default (ComposedComponent) => class extends React.Component {
  // Initial state with window sizes
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }

  constructor(props, context) {
    super(props, context);

    // We must redefine handleResize so that it is throttled, and so we are able to remove the
    // event listener when the component is unmounted. This must be done in the constructor.
    this.handleResize = throttle(this.handleResize, 200);
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
