'use strict';

import * as types from './actionTypes';

const initialUserPinsState = {
  pins: [],
  pending: false
}

function userPinsReducer(state = initialUserPinsState, action) {
  let newPins;
  let newPin;
  let newLikes;
  let exists;
  let newState;
  switch(action.type) {
    case types.ADD_USER_PINS:
      return Object.assign({}, state, action.pins);
    case types.ADD_USER_PINS_FAILED:
      if (action.clear) {
        return Object.assign({}, state, initialUserPinsState);
      }
      return state;
    case types.REMOVE_USER_PIN:
      newPins = state.pins.filter(pin => {
        return pin._id !== action.pinId;
      });
      return Object.assign({}, state, {pins: newPins});
    case types.UPDATE_LIKED:
      newPins = state.pins.map(pin => {
        if (pin._id !== action.payload.pinId) {
          return pin;
        }
        // if liked remove like. if unliked add like
        exists = pin.likes.some(like => {
          return like.userId === action.payload.userId;
        });
        if (exists) {
          newLikes = pin.likes.filter(like => {
            return like.userId !== action.payload.userId;
          });
          return Object.assign({}, pin, {likes: newLikes});
        }
        newLikes = pin.likes.concat({userId: action.payload.userId});
        return Object.assign({}, pin, {likes: newLikes});
        
      });
      return Object.assign({}, state, {pins: newPins});

    default:
      return state;
  }
}

export default userPinsReducer;
