'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as types from './actionTypes';
import userReducer from './userReducer';
import pinsReducer from './pinsReducer';

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



function imageReducer(state = { url: 'http://placehold.it/350x150', isInvalidURL: false, isLoading: false }, action) {
  switch(action.type) {
    case types.CHECK_IMAGE_PENDING:
      return {
        isInvalidURL: true,
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
        url: 'http://placehold.it/350x150'
      };
    default:
      return {
        isLoading: false,
        isInvalidURL: true,
        url: 'http://placehold.it/350x150'
      };
  }
}

function createPin(state = {}, action) {
  switch(action.type) {
    case 'CHECK_IMAGE':
      return {
        payload: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
  userReducer,
  pinsReducer,
  createPin,
  imageReducer,
  form: formReducer,
});
