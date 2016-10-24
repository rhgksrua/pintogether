'use strict';

import * as types from '../reducers/actionTypes';

export const checkLogin = () => {
  return {
    type: types.ADD_USER_STATUS,
    payload: checkUserStatus(),
  };
};

export const logOut = () => {
  return {
    type: types.REMOVE_USER_STATUS,
    payload: {
      promise: removeUserStatus()
    }
  };
}

export const checkUserStatus = () => {
  const options = {
    method: 'POST',
    credentials: 'same-origin',
  };
  const port = window.location.port ? `:${window.location.port}` : '';
  const url = `${window.location.protocol}//${window.location.hostname}${port}/user/login`;
  return fetch(url, options)
    .then(res => {
      if (res.status >= 400) {
        throw new Error('failed to authenticate');
      }
      return res.json();
    })
    .then(userInfo => {
      if (userInfo.error) {
        throw new Error('failed');
      }
      return userInfo;
    })
    .catch(err => {
      console.log(err.message);
      return Promise.reject(err);
    });
}

export const removeUserStatus = () => {
  const options = {
    method: 'POST',
    credentials: 'same-origin',
  };
  const url = 'user/logout';
  return fetch(url, options)
    .then(res => {
      if (res.status >= 400) {
        throw new Error('failed to logout');
      }
      return res.json();
    })
    .then(userInfo => {
      if (userInfo.error) {
        throw new Error('failed to logout. server issues.');
      }
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.message);
      return Promise.reject(err);
    });
}
