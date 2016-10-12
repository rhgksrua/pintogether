'use strict';

import * as types from '../reducers/actionTypes';

export const setImage = (url) => {
  return {
    type: 'SET_IMAGE',
    url
  };
};

