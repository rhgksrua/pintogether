'use strict';

import * as types from '../reducers/actionTypes';

export const removeUserPin = (pinId) => {
  return {
    type: types.REMOVE_USER_PIN,
    pinId
  };
};

export const removeUserPinFailed = () => {
  return {
    type: types.REMOVE_USER_PIN_FAILED,
  };
}

export const removePin = pinId => {
  return dispatch => {
    const port = window.location.port ? `:${window.location.port}` : '';
    const url = `${window.location.protocol}//${window.location.hostname}${port}/pins`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      credentials: 'same-origin',
      body: JSON.stringify({ pinId })
    }
    return fetch(url, options)
      .then(res => {
        if (res.status >= 400) throw new Error('server n/a');
        return res.json();
      })
      .then(res => {
        if (res.error) throw new Error('cannot remove');
        return dispatch(removeUserPin(pinId));
      })
      .catch(err => {
        console.error(err);
        dispatch(removeUserPinFailed());
      });
  };
};

