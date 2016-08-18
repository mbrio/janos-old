import React from 'react';
import throttle from 'lodash.throttle';

const hasWindow = typeof window !== 'undefined';

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
    windowWidth: hasWindow ? window.innerWidth : 0,
    windowHeight: hasWindow ? window.innerHeight : 0,
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
    if (hasWindow) {
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (hasWindow) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  render() {
    const { windowWidth, windowHeight } = this.state;

    return (
      <ComposedComponent
        {...this.props}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    );
  }
};
