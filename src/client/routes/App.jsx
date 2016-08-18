import React from 'react';
import Helmet from 'react-helmet';

/**
 * The root component as a stateless function component.
 *
 * @param {Object} props - The properties passed down from the parental React component
 * @return {element}
 */
function App(props) {
  return (
    <div>
      <Helmet
        title="Janos Gat Gallery"
        htmlAttributes={{ lang: 'en' }}
      />
      { props.children }
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
