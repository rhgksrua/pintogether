'use strict';

import * as types from './actionTypes';

const initialPinsState = {
  pins: [],
  pending: false
}

function pinsReducer(state = initialPinsState, action) {
  let newPins;
  let newPin;
  let newLikes;
  let exists;
  let newState;
  switch(action.type) {
    case types.FETCH_ALL_PINS:
      return Object.assign({}, state, action.allPins);
    case types.UPDATE_LIKED:

      newPins = state.pins.map(pin => {
        exists = pin.likes.some(like => {
          if (like.userId === action.payload.userId) {
            return true;
          }
          return false;
        });
        if (exists) {
          newLikes = pin.likes.filter(like => {
            return like.userId !== action.payload.userId;
          });
        } else {
          newLikes = pin.likes.concat({userId: action.payload.userId});
        }
        newPin = Object.assign({}, pin);
        newPin.likes = newLikes;
        return newPin;
      });
      return Object.assign({}, state, {pins: newPins});

    default:
      return state;
  }
}


export default pinsReducer;
