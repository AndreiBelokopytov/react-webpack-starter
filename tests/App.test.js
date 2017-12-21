import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../src/app/App.js';

describe('<App />', () => {
  it('renders an `.logo`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.logo')).to.have.length(1);
  });
});
