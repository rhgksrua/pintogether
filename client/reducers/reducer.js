'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as types from './actionTypes';
import userReducer from './userReducer';
import pinsReducer from './pinsReducer';
import userPinsReducer from './userPinsReducer';
import imageReducer from './imageReducer';
import navReducer from './navReducer';
import createPinReducer from './createPinReducer';

function createPin(state = {}, action) {
  switch(action.type) {
    case types.CHECK_IMAGE:
      return {
        payload: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  userReducer,
  pinsReducer,
  userPinsReducer,
  createPin,
  imageReducer,
  navReducer,
  createPinReducer,
  form: formReducer,
});
