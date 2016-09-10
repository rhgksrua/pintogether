'use strict';

import { combineReducers } from 'redux';
import * as types from './actionTypes';

function reducer(state = {}, action) {
  switch(action.type) {
    case types.NONE:
      return state;
    default:
      return state;
  }
}

/**
 *
 * reducers will mostlikely have more than one reducer to store
 * state.
 *
 */
export default combineReducers({
  reducer,
});
