import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CreatePinFields } from './CreatePinFields';
import { Field } from 'redux-form';

describe('<CreatePinField />', () => {
  let props;
  beforeEach(() => {
    props = {
      handleSubmit: () => {},
      myHandleSubmit: () => {},
      onSubmit: () => {},
      title: 'test title',
      imageURL: 'test url',
      pristine: true,
      submitting: false,
      imageReducer: {
        isLoading: false,
        url: 'imagereducer image',
        isInvalidURL: false
      }
    };
  });
  it('renders reactElements without any children elements', () => {
    const wrapper = shallow(<CreatePinFields {...props} />);
    expect(wrapper.contains([
      <label htmlFor='title'>Title</label>
    ])).to.equal(true);
  });
  it('renders two <Field /> component, title and image url', () => {
    const wrapper = shallow(<CreatePinFields {...props} />);
    expect(wrapper.find(Field)).to.have.length(2);
  });
  it('handles redux form submit when clicked on Submit', () => {
    const handleSubmit = sinon.spy();
    const newProps = Object.assign(props, { handleSubmit });
    const wrapper = shallow(<CreatePinFields { ...newProps } />);
    wrapper.find('button').simulate('click');
    expect(handleSubmit.calledOnce);
  }); 
});


