'use strict';

import * as types from '../reducers/actionTypes';

export const setImage = (url) => {
  return {
    type: types.SET_IMAGE,
    url
  };
};

export const imageError = () => {
  return {
    type: types.IMAGE_ERROR
  };
}

export const imageLoad = () => {
  return {
    type: types.IMAGE_LOAD
  };
}
