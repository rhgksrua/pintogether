'use strict';

import React, { Component, PropTypes } from 'react';

class TitleField extends Component {
  render() {
    const { input, meta: { touched, error }} = this.props;
    return (
      <div>
        <label>Title</label>
        <div>
          <input {...input} type='text' />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

export default TitleField;
