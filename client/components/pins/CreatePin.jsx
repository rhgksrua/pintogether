'use strict';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class CreatePin extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='create-container'>
        <form onSubmit={handleSubmit((...args) => console.log(args))}>
          <div>
            <label htmlFor='title'>Title</label>
            <Field name='title' component='input' type='text' />
          </div>
          <div>
            <label htmlFor='imageUrl'>Image URL</label>
            <Field name='imageURL' component='input' type='text' />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

CreatePin.propTypes = {
};

CreatePin = reduxForm({
  form: 'newPin'
})(CreatePin);

export default CreatePin;


