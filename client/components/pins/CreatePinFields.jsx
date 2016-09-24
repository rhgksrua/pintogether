'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

import { createPin } from '../../actions/createPinActions';
import ImageURLField from './ImageURLField';

export class CreatePinFields extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleSubmit, myHandleSubmit, onSubmit, title, imageURL, pristine, submitting } = this.props;
    const { isLoading, url, isInvalidURL } = this.props.imageReducer;
    return (
      <div className='create-container'>
        <form onSubmit={handleSubmit(myHandleSubmit)}>
          <div>
            <label htmlFor='title'>Title</label>
            <Field name='title' component='input' type='text' />
          </div>
          <div>
            <Field name='imageURLField' component={ImageURLField} props={{ isLoading, url, isInvalidURL }}/>
          </div>
          <button type='submit' disabled={pristine || submitting}>Submit</button>
        </form>
      </div>
    );
  }
}

CreatePinFields.propTypes = {
};

const CreatePinFieldsFormWrapper = reduxForm({
  form: 'newPin',
})(CreatePinFields);

const selector = formValueSelector('newPin');

const mapStateToProps = (state) => {
  const { title, imageURL } = selector(state, 'title', 'imageURL');
  const { imageReducer } = state;
  return {
    title,
    imageURL,
    imageReducer
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    myHandleSubmit(formValues) {
      const { title, imageURLField } = formValues;
      dispatch(createPin(title, imageURLField));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePinFieldsFormWrapper);


