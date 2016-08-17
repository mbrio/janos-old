import React from 'react';

/**
 * The root component as a stateless function component.
 *
 * @param {Object} props - The properties passed down from the parental React component
 * @return {element}
 */
function App(props) {
  return <div>{ props.children }</div>;
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
