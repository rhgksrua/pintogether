'use strict';

import * as types from './actionTypes';

const initialState = {
  show: false
}

export default function navReducer(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_MENU:
      // toggle mobile menu
      return Object.assign({}, state, {show: !state.show});
    default:
      return state;
  }
}
