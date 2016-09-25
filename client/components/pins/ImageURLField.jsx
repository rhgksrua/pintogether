'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';
import FontAwesome from 'react-fontawesome';

import { checkImage } from '../../actions/actions';

export class ImageURLField extends Component {
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
    this.delayedHandleImage = debounce(this.delayedHandleImage.bind(this), 1000);
  }
  delayedHandleImage(e) {
    const { meta: { dispatch }, input: { value, onChange } } = this.props;
    const url = e.target.value;
    dispatch(checkImage(url));
  }
  handleImage(e) {
    const { input: { onChange }} = this.props;
    e.persist();
    onChange(e.target.value);
    this.delayedHandleImage(e)
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

