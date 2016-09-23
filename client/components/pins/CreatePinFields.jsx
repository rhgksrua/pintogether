'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

import { checkImage } from '../../actions/actions';
import ImageURLField from './ImageURLField';

class CreatePinFields extends Component {
  constructor() {
    super();
  }
  render() {
    const { handleSubmit, title, imageURL } = this.props;
    const { isLoading, url, isInvalidURL } = this.props.imageReducer;
    return (
      <div className='create-container'>
        <form onSubmit={handleSubmit((...args) => console.log(args))}>
          <div>
            <label htmlFor='title'>Title</label>
            <Field name='title' component='input' type='text' />
          </div>
          <div>
            <Field name='imageURLField' component={ImageURLField} props={{ isLoading, url, isInvalidURL }}/>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

CreatePinFields.propTypes = {
};

CreatePinFields = reduxForm({
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
    checkImage: (url) => {
      dispatch(checkImage(url));
    }
  }
}

CreatePinFields = connect(mapStateToProps, mapDispatchToProps)(CreatePinFields);

export default CreatePinFields;


