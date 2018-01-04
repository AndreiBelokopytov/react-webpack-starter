import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../src/app/App.js';
import styles from '../src/app/App.css'

describe('<App />', () => {
  it('renders logo', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(`.${styles.logo}`)).to.have.length(1);
  });
});
