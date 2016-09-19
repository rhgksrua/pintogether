'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'debounce';
import FontAwesome from 'react-fontawesome';

import { checkImage } from '../../actions/actions';

class ImageURLField extends Component {
  constructor(props) {
    super();
    this.handleImage = this.handleImage.bind(this);
    this.delayedHandleImage = debounce(this.delayedHandleImage.bind(this), 3000);
  }
  delayedHandleImage(e) {
    const { meta: { dispatch }, input: { value, onChange } } = this.props;
    const url = e.target.value;
    onChange(url);
    dispatch(checkImage(url));
  }
  handleImage(e) {
    e.persist();
    this.delayedHandleImage(e)
  }
  render() {
    const { isInvalidURL, isLoading, url, dispatch, input: { value, onChange } } = this.props;
    return (
      <div>
        <FontAwesome name='rocket' /> 
        <div>
          {isLoading &&
          <p>LOADING</p>
          }
        </div>
        <div>
          {isLoading ?
            <FontAwesome name='rocket' /> 
            :
            <img src={isInvalidURL ? url : value} />
          }
        </div>
        <div>
          <p>current value {value}</p>
          <label htmlFor='imageURL'>Image URL</label>
          <input type='text' onChange={this.handleImage} />
        </div>
      </div>
    );
  }
}

export default ImageURLField;

