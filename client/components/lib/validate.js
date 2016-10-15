'use strict';

const regex = /^http/;

/**
 * validate
 *
 * validation func for redux-form
 *
 * @returns {Object}
 */
export const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 2) {
    errors.title = 'too short';
  }
  if (!values.imageURLField) {
    errors.imageURLField = 'Required';
  } else if (!regex.test(values.imageURLField)) {
    errors.imageURLField = 'Needs to begin with \'http\'';
  }
  return errors;
}
