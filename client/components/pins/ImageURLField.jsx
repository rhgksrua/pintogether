'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';
import FontAwesome from 'react-fontawesome';

import { setImage } from '../../actions/userImageActions';

export class ImageURLField extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { input, meta: { touched, error } } = this.props;
    return (
      <div className='image-url-container'>
        <label htmlFor='imageURL'>Image URL</label>
        <input {...input} type='text' />
        {touched && error ? 
        <span className='field-error'>{error}</span>
        :
        <span className='field-error'></span>
        }
      </div>
    );
  }
}

export default ImageURLField;
