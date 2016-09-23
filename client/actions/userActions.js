import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';

import * as types from '../reducers/actionTypes';

export const checkLogin = () => {
  return {
    type: types.ADD_USER_STATUS,
    payload: {
      promise: checkUserStatus()
    }
  };
};

const checkUserStatus = () => {
  const options = {
    method: 'POST',
    credentials: 'same-origin',
  };
  const url = 'user/login';
  return new Promise((resolve, reject) => {
    fetch(url, options)
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
        return resolve(userInfo);
      })
      .catch(err => {
        console.log(err.message);
        reject(err.message);
      });
  });
};
