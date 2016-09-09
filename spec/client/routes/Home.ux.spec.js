import React from 'react';
import { Home } from '../../../src/client/routes/Home.jsx';
import { shallow, mount } from 'enzyme';

describe('Home', () => {
  describe('UX', () => {
    it('should generate a random number within new state when clicked', () => {
      const wrapper = shallow(
        <Home windowWidth={1000} windowHeight={1000} />
      );

      expect(wrapper.state('message')).toBe('Hello, App!');
      wrapper.find('button[onClick]').simulate('click', { preventDefault: () => {}});
      expect(typeof wrapper.state('message')).toBe('number');
    });

    it('should display the message', () => {
      const wrapper = mount(
        <Home windowWidth={1000} windowHeight={1000} />
      );

      const originalMessage = wrapper.state('message');
      expect(typeof originalMessage).toBe('string');
      expect(wrapper.find('.label').text()).toBe(originalMessage);

      wrapper.find('button[onClick]').simulate('click', { preventDefault: () => {}});
      expect(wrapper.find('.label').text()).not.toBe(originalMessage);
    });
  });
});
