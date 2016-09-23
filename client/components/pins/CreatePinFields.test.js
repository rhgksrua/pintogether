import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CreatePinFields } from './CreatePinFields';
import { Field } from 'redux-form';

describe('<CreatePinField />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      handleSubmit: () => {},
      title: 'test title',
      imageURL: 'test url',
      imageReducer: {
        isLoading: false,
        url: 'imagereducer image',
        isInvalidURL: false
      }
    };
  });
  it('renders CreatePin component with <Field />', () => {
    //const wrapper = shallow(<CreatePinFields {...props} />);
    const wrapper = shallow(<CreatePinFields {...props} />);
    expect(wrapper.contains([
      <Field name='CreatePinFieldTestName' component='input' />,
      <button type='submit'>Submit</button>
    ]));
  });
  it('handles redux form submit', () => {
    //const props = wrapper.props();
    const handleSubmit = sinon.spy();
    const newProps = Object.assign(props, { handleSubmit });
    const wrapper = shallow(<CreatePinFields { ...newProps } />);
    //const handleSubmitMethod = wrapper.instance().handleSubmit();
    wrapper.find('button').simulate('click');
    expect(handleSubmit.calledOnce);
  }); 
});


