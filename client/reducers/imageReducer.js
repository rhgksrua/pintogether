'use strict';

import * as types from './actionTypes';

const initialState = { 
  url: 'http://placehold.it/350x150', 
  isInvalidURL: false, 
  isLoading: false,
  error: true,
};

export default function imageReducer(state = initialState, action) {
  switch(action.type) {
    case types.SET_IMAGE:
      return Object.assign({}, state, {url: action.url});
    case types.IMAGE_ERROR:
      return Object.assign({}, state, {error: true});
    case types.IMAGE_LOAD:
      return Object.assign({}, state, {error: false});
    case 'redux-form/CHANGE':
      // listen for changes in redux form and reset image error.
      return Object.assign({}, state, {error: false});
    default:
      return state;
  }
}

