'use strict';

import * as types from './actionTypes';

const initialUserPinsState = {
  pins: [],
  pending: false
}

function userPinsReducer(state = initialUserPinsState, action) {
  switch(action.type) {
    case types.ADD_USER_PINS:
      console.log('reducer pins', action.pins);
      return Object.assign({}, state, action.pins);
    default:
      return state;
  }
}

export default userPinsReducer;
