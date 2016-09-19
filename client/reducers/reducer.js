'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as types from './actionTypes';

function reducer(state = {}, action) {
  switch(action.type) {
    case types.NONE:
      return state;
    case 'CHECK_IMAGE_PENDING':
      console.log('pending!!!!');
      return {
        payload: 'pending'
      };
    case 'CHECK_IMAGE':
      console.log(action.payload);
      return {
        payload: action.payload
      }; 
    default:
      return state;
  }
}

function imageReducer(state = { isInvalidURL: false, isLoading: false }, action) {
  switch(action.type) {
    case types.CHECK_IMAGE_PENDING:
      return {
        isLoading: true,
        url: 'loading image'
      };
    case types.CHECK_IMAGE_FULFILLED:
      return {
        isLoading: false,
        isInvalidURL: false,
        url: action.payload
      };
    case types.CHECK_IMAGE_REJECTED:
      return {
        isLoading: false,
        isInvalidURL: true,
        url: action.payload
      };
    default:
      return state;
  }
}

function createPin(state = {}, action) {
  switch(action.type) {
    case 'CHECK_IMAGE':
      console.log('reducer CHECK_IMAGE', action);
      return {
        payload: action.payload
      };
    default:
      return state;
  }
}

const initialUserState = {
  firstName: '',
  lastName: '',
};

export default combineReducers({
  reducer,
  createPin,
  imageReducer,
  form: formReducer,
});
