'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { createPin } from '../../actions/createPinActions';
import ImageURLField from './ImageURLField';
import TitleField from './TitleField';
import { validate } from '../lib/validate';

export class CreatePinFields extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      handleSubmit, 
      myHandleSubmit, 
      onSubmit, 
      title, 
      imageURL, 
      pristine, 
      submitting,
      imageReducer: {
        isLoading,
        url,
        isInvalidURL
      },
    } = this.props;
    return (
      <div className='create-pin-container'>
        <form className='create-pin-form' onSubmit={handleSubmit(myHandleSubmit)}>
          <div className='title-field'>
            <Field 
              name='title' 
              component={TitleField} 
            />
          </div>
          <div className='url-field'>
            <Field 
              name='imageURLField' 
              component={ImageURLField} 
              props={{ isLoading, url, isInvalidURL }}
            />
          </div>
          <button className='pin-submit' type='submit' disabled={pristine || submitting}>Submit</button>
        </form>
      </div>
    );
  }
}

CreatePinFields.propTypes = {
};


/**
 * CreatePinFieldsFormWrapper
 *
 * Wraps React component with reduxForm
 *
 * @returns reduxForm object
 */
const CreatePinFieldsFormWrapper = reduxForm({
  form: 'newPin',
  validate
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
