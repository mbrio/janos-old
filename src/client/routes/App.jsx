import React from 'react';
import Helmet from 'react-helmet';

/**
 * The root component as a stateless function component.
 *
 * @param {Object} props - The properties passed down from the parental React component
 * @return {element}
 */
function App(props) {
  // const { appConfig } = props;
  const appConfig = {
    helmet: {
      title: 'Janos Gat Gallery',
      titleTemplate: '%s | Janos Gat Gallery',
    },
  };

  return (
    <div>
      <Helmet
        title={appConfig.helmet.title}
        titleTemplate={appConfig.helmet.titleTemplate}
        htmlAttributes={{ lang: 'en' }}
      />
      { props.children }
    </div>
  );
}

App.propTypes = {
  // appConfig: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default App;
