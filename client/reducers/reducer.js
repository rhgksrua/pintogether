'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as types from './actionTypes';

function reducer(state = {}, action) {
  switch(action.type) {
    case types.NONE:
      return state;
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
  form: formReducer,
});
