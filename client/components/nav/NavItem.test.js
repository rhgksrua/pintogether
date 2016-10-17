import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';

import NavItem from './NavItem';

describe('<NavItem />', () => {
  it('renders nav item', () => {
    const props = {
      to: '/test',
      itemName: 'testItemName',
      onlyActiveOnIndex: false,
    };
    const wrapper = mount(<NavItem {...props} />);
    expect(wrapper.text()).to.equal('testItemName');
  });
  it('renders nav item without link', () => {
    const wrapper = mount(<NavItem itemName='test' />);
    expect(wrapper.text()).to.equal('test');
  });
});

