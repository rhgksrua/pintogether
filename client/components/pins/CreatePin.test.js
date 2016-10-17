import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CreatePin } from './CreatePin';

describe('<CreatePin />', () => {
  it('renders CreatePin component with <img />', () => {
    const imageReducer = {
      isLoading: true,
      isInvalidURL: true,
      url: 'none',
    };
    const createPinReducer = {
      status: 'none'
    };
    const newPin = {
    };
    const wrapper = shallow(<CreatePin imageReducer={imageReducer} createPinReducer={createPinReducer} newPin={newPin} />);
    expect(wrapper.contains([
      <img className='user-image' src='none' />
    ]));
  });
});

