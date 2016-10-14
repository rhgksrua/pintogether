'use strict';

import React, { Component, PropTypes } from 'react';

class TitleField extends Component {
  render() {
    const { input, meta: { touched, error }} = this.props;
    return (
      <div>
        <label htmlFor='title'>Title</label>
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

export default TitleField;
