'use strict';

import * as types from './actionTypes';

const initialState = { 
  url: 'http://placehold.it/350x150', 
  isInvalidURL: false, 
  isLoading: false 
};

export default function imageReducer(state = initialState, action) {
  switch(action.type) {
    case types.SET_IMAGE:
      return Object.assign({}, state, {url: action.url});
    default:
      return state;
  }
}

