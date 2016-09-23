import Promise from 'bluebird';
import 'isomorphic-fetch';

import * as types from '../reducers/actionTypes';

export const createPin = (title, url) => {
  return {
    type: types.CREATE_PIN,
    payload: {
      promise: createPinPromise(title, url)
    }
  };
};

export const createPinPromise = (title, url) => {
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
        console.log('returned pin from server', pin);
        // pin should be an object with title and pin and status
        if (pin.error) throw new Error('failed to create pin (db)');
        return resolve(pin);
      })
      .catch(err => {
        reject(err);
      });
  });

};
