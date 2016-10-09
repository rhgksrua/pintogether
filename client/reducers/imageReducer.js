'use strict';

import * as types from './actionTypes';

export default function imageReducer(state = { url: 'http://placehold.it/350x150', isInvalidURL: false, isLoading: false }, action) {
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
      return state;
  }
}

