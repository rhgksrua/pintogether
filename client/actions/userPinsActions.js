'use strict';

import * as types from '../reducers/actionTypes';

export const addUserPins = pins => {
  return {
    type: types.ADD_USER_PINS,
    pins
  };
};

export const addUserPinsFailed = () => {
  return {
    type: types.ADD_USER_PINS_FAILED,
  };
};

export function fetchUserPins(username) {
  return dispatch => {
    const options = {
      method: 'get',
      credentials: 'same-origin'
    };
    const port = window.location.port ? `:${window.location.port}` : '';
    const url = `${window.location.protocol}//${window.location.hostname}${port}/pins/${username}`;
    return fetch(url, options)
      .then(res => {
        if (res.status >= 400) throw new Error('server n/a');
        return res.json();
      })
      .then(pins => {
        if (pins.error) throw new Error(pins.message);
        return dispatch(addUserPins(pins));
      })
      .catch(err => {
        console.error(err);
        dispatch(addUserPinsFailed());
      });
  }

}
