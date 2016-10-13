'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';
import FontAwesome from 'react-fontawesome';

import { setImage } from '../../actions/userImageActions';

class ImageURLField extends Component {
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
  }
  handleImage(e) {
    const { meta: { dispatch }, input: { value, onChange }} = this.props;
    onChange(e.target.value);
    //const url = e.target.value;
    //dispatch(setImage(url));
  }
  render() {
    //console.log('********props in urlfield', this.props);
    const { input, meta: { touched, error } } = this.props;
    return (
      <div className='image-url-container'>
        <label htmlFor='imageURL'>Image URL</label>
        <input {...input} type='text' onChange={this.handleImage} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

export default ImageURLField;
