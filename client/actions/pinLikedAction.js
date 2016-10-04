'use strict';

import * as types from '../reducers/actionTypes';

export const updateLiked = (payload) => {
  return {
    type: types.UPDATE_LIKED,
    payload
  };
};

export const updateLikedFailed = () => {
  return {
    type: types.UPDATE_LIKED_FAILED,
  };
}

export const pinLiked = pinId => {
  return dispatch => {
    const port = window.location.port ? `:${window.location.port}` : '';
    const url = `${window.location.protocol}//${window.location.hostname}${port}/pins/like`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({ pinId })
    }
    return fetch(url, options)
      .then(res => {
        if (res.status >= 400) throw new Error('server n/a');
        return res.json();
      })
      .then(res => {
        if (res.error || !res.id) throw new Error('cannot like');
        return dispatch(updateLiked({ pinId, userId: res.id }));
      })
      .catch(err => {
        console.error(err);
        dispatch(updateLikedFailed());
      });
  };
};
