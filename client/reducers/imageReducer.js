'use strict';

import * as types from './actionTypes';

const initialState = { 
  //url: 'http://placehold.it/350x150', 
  url: '', 
  isInvalidURL: false, 
  isLoading: false 
};

export default function imageReducer(state = initialState, action) {
  switch(action.type) {
    case types.CHECK_IMAGE:
      return Object.assign({}, state, {url: action.url});
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
      return state;
  }
}

