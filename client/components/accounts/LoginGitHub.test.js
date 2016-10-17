import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LoginGitHub from './LoginGitHub';

describe('<LoginGitHub />', () => {
  it('renders login button', () => {
    const wrapper = shallow(<LoginGitHub />);
    expect(wrapper.text()).to.contain('');
  });
});
