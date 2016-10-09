'use strict';

import * as types from '../reducers/actionTypes';

export const receivePins = (allPins) => {
  return {
    type: types.FETCH_ALL_PINS,
    allPins
  };
};

export const receivePinsFailed = () => {
  return {
    type: types.FETCH_ALL_PINS_FAILED,
  };
};

export function fetchAllPins(allPins) {
  return dispatch => {
    const port = window.location.port ? `:${window.location.port}` : '';
    const url = `${window.location.protocol}//${window.location.hostname}${port}/pins`;
    const options = {
      method: 'get'
    }
    return fetch(url, options)
      .then(res => {
        if (res.status >= 400) throw new Error('server unavailable');
        return res.json();
      })
      .then(pins => {
        if (pins.error) throw new Error('invalid pins');
        dispatch(receivePins(pins));
      })
      .catch(err => {
        console.error(err);
        dispatch(receivePinsFailed());
      });
  };
}
