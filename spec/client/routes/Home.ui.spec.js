import React from 'react';
import Home from '../../../src/client/routes/Home.jsx';
import renderer from 'react-test-renderer';

describe('Home', () => {
  describe('UI', () => {
    it('renders with expected output', () => {
      const component = renderer.create(
        <Home windowWidth="1000" windowHeight="1000" />
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
