'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';

import { setImage, imageError, imageLoad } from '../../actions/userImageActions';
import CreatePinFields from './CreatePinFields';
import ImageURLField from './ImageURLField';

export class CreatePin extends Component {
  constructor(props) {
    super();
  }
  handleImageError() {
    console.warn('Broken image url');
    this.props.imageError();
  }
  handleImageLoad() {
    this.props.imageLoad();
  }
  render() {
    const { 
      newPin, 
      createPinReducer: { status }, 
      imageReducer: { error, isLoading, url, isInvalidURL } 
    } = this.props;

    let newURL;
    try {
      newURL = error ? url : newPin.values.imageURLField;
    } catch (e) {
      newURL = url;
    }

    return (
      <div className='create-container'>
        <h3 className='page-title'>Create</h3>
        <div className='user-image-container'>
          <img 
            className='user-image' 
            src={newURL} 
            onError={this.handleImageError.bind(this)} 
          />
        </div>
        <CreatePinFields />
        <div className='create-pin-error'>
          <p className='error-message'>{status}</p>
        </div>
      </div>
    );
  }
}

CreatePin.propTypes = {
};

const mapStateToProps = (state) => {
  const { imageReducer, createPinReducer, form: { newPin } } = state;
  return {
    imageReducer,
    createPinReducer,
    newPin
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setImage: (url) => {
      dispatch(setImage(url));
    },
    imageError: () => {
      dispatch(imageError());
    },
    imageLoad: () => {
      dispatch(imageLoad());
    }
  }
}

const CreatePinConnect = connect(mapStateToProps, mapDispatchToProps)(CreatePin);

export default CreatePinConnect;

