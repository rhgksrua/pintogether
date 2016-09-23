import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CreatePin } from './CreatePin';

describe('<CreatePin />', () => {
  it('renders CreatePin component with <img />', () => {
    const imageReducer = {
      isLoading: true,
      isInvalidURL: true,
      url: 'none'
    };
    const wrapper = shallow(<CreatePin imageReducer={imageReducer} />);
    expect(wrapper.contains([
      <img />
    ]));
  });
});

