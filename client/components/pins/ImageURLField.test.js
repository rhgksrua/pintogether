'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { ImageURLField } from './ImageURLField';
import { Field } from 'redux-form';

describe('<ImageURLField />', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      input: {
        onChange: () => {}
      },
      meta: {
      }
    };
    wrapper = shallow(<ImageURLField {...props} />);
  });
  it('renders reactElement div container', () => {
    expect(wrapper.find('.image-url-container')).to.have.length(1);
  });
  it('renders reactElement input', () => {
    //const wrapper = shallow(<ImageURLField {...props} />);
    expect(wrapper.find('input')).to.have.length(1);
  });
  it('renders reactElement label', () => {
    //const wrapper = shallow(<ImageURLField {...props} />);
    expect(wrapper.find('label')).to.have.length(1);
  });
});

