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
    this.handleImage = this.handleImage.bind(this);
  }
  handleImage(e) {
    const { meta: { dispatch }, input: { value, onChange }} = this.props;
    //e.persist();
    onChange(e.target.value);
    const url = e.target.value;
    dispatch(setImage(url));
  }
  render() {
    return (
      <div className='image-url-container'>
        <label htmlFor='imageURL'>Image URL</label>
        <input type='text' onChange={this.handleImage} />
      </div>
    );
  }
}

export default ImageURLField;

