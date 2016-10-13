'use strict';

const regex = /^http/;

export const validate = values => {
  console.log('*** values', values);
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 3) {
    errors.title = 'too short';
  }
  if (!values.imageURLField) {
    errors.imageURLField = 'Required';
  } else if (!regex.test(values.imageURLField)) {
    errors.imageURLField = 'Needs to begin with \'http\'';
  }
  return errors;
}
