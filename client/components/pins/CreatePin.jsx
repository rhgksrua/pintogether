'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';

import { setImage } from '../../actions/userImageActions';
import CreatePinFields from './CreatePinFields';
import ImageURLField from './ImageURLField';

// styles

export class CreatePin extends Component {
  constructor(props) {
    super();
  }
  handleImageError() {
    console.warn('Broken image url');
    this.props.setImage('http://placehold.it/350x150');
  }
  render() {
    console.log(this.props);
    const { isLoading, url, isInvalidURL } = this.props.imageReducer;
    return (
      <div className='create-container'>
        <h3 className='page-title'>Create</h3>
        <div className='user-image-container'>
          <img className='user-image' src={url} onError={this.handleImageError.bind(this)} />
        </div>
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
    setImage: (url) => {
      dispatch(setImage(url));
    }
  }
}

const CreatePinConnect = connect(mapStateToProps, mapDispatchToProps)(CreatePin);

export default CreatePinConnect;

