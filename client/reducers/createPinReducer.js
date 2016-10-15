'use strict';

import * as types from './actionTypes';

const initialState = {
  status: ''
};

function createPinReducer(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_PIN_FULFILLED:
      return Object.assign({}, state, {status: 'New pin created'});;
    case types.CREATE_PIN_REJECTED:
      return Object.assign({}, state, {status: 'Failed to create new pin'});
    case types.CREATE_PIN_PENDING:
      return Object.assign({}, state, {status: ''});
    default:
      return state;
  }
}

export default createPinReducer;
