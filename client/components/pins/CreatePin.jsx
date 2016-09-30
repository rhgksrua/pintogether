'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';

import { checkImage } from '../../actions/actions';
import CreatePinFields from './CreatePinFields';
import ImageURLField from './ImageURLField';

export class CreatePin extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { isLoading, url, isInvalidURL } = this.props.imageReducer;
    return (
      <div className='create-container'>
        <img src={url} />
        <div>isInvalidURL: {isInvalidURL.toString()}</div>
        <div>isLoading: {isLoading.toString()}</div>
        <CreatePinFields />
      </div>
    );
  }
}

CreatePin.propTypes = {
};

const mapStateToProps = (state) => {
  const { imageReducer } = state;
  return {
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

const CreatePinConnect = connect(mapStateToProps, mapDispatchToProps)(CreatePin);

export default CreatePinConnect;

