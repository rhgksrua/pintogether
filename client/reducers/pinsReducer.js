'use strict';

import * as types from './actionTypes';

const initialPinsState = {
  pins: [],
  pending: false
}

function pinsReducer(state = initialPinsState, action) {
  switch(action.type) {
    case types.FETCH_ALL_PINS_FULFILLED:
      return state;
    default:
      return state;
  }
}

export default pinsReducer;
