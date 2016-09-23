'use strict';

import * as types from './actionTypes';

function userReducer(state = { loggedIn: false }, action) {
  switch(action.type) {
    case types.ADD_USER_STATUS_FULFILLED:
      const userStatus = {
        loggedIn: true,
        username: action.payload.username
      };
      return Object.assign(state, userStatus);
    case types.ADD_USER_STATUS_REJECTED:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
}

export default userReducer;
