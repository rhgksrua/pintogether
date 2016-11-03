'use strict';

//import Promise from 'bluebird';
//import 'isomorphic-fetch';

import { reset } from 'redux-form';

import * as types from '../reducers/actionTypes';

/**
 * This action exists only to inject dispatch to createPinPromise.
 *
 * @returns {undefined}
 */
export const createPin = (title, url, actionCreator = createPinPromiseAction) => {
  return dispatch => {
    dispatch(actionCreator(title, url, dispatch));
  };
};

export const createPinPromiseAction = (title, url, dispatch) => {
  return {
    type: types.CREATE_PIN,
    payload: {
      promise: createPinPromise(title, url, dispatch)
    }
  };
}

export const createPinPromise = (title, url, dispatch) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ title, url })
  };
  const apiUrl = 'pins';
  return new Promise((resolve, reject) => {
    fetch(apiUrl, options)
      .then(res => {
        if (res.status >= 400) throw new Error('failed to create pin');
        return res.json();
      })
      .then(pin => {
        // pin should be an object with title and pin and status
        if (pin.error) throw new Error('failed to create pin (db)');
        dispatch(reset('newPin'));
        return resolve(pin);
      })
      .catch(err => {
        reject(err);
      });
  });
};
