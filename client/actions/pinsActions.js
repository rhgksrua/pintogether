'use strict';

import Promise from 'bluebird';
import 'isomorphic-fetch';

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

export const requestPins = () => {
  return {
    type: types.REQUEST_ALL_PINS,
  };
};

export function fetchAllPins(allPins) {
  return dispatch => {
    //dispatch(requestPins());
    const options = {
      method: 'get'
    }
    return fetch('pins', options)
      .then(res => {
        if (res.status >= 400) throw new Error('server unavailable');
        return res.json();
      })
      .then(pins => {
        if (pins.error) throw new Error('invalid pins');
        dispatch(receivePins(pins));
      })
      .catch(err => {
        console.log(err);
        dispatch(receivePinsFailed());
      });
  };
}
