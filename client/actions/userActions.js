import Promise from 'bluebird';
import 'isomorphic-fetch';

import * as types from '../reducers/actionTypes';

export const checkLogin = () => {
  return {
    type: types.ADD_USER_STATUS,
    payload: {
      promise: checkUserStatus()
    }
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

const checkUserStatus = () => {
  const options = {
    method: 'POST',
    credentials: 'same-origin',
  };
  const url = 'user/login';
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
      Promise.resolve(userInfo);
      return userInfo;
    })
    .catch(err => {
      Promise.reject(err);
      console.log(err.message);
    });
}

const xcheckUserStatus = () => {
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
          //return res.json().then(Promise.reject.bind(Promise));
        }
        return res.json();
      })
      .then(userInfo => {
        if (userInfo.error) {
          throw new Error('failed');
        }
        return Promise.resolve(userInfo);
      })
      .catch(err => {
        console.log(err.message);
        Promise.reject(err);
      });
  });
};

const removeUserStatus = () => {
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
      return resolve();
    })
    .catch(err => {
      console.log(err.message);
    });
}

const xremoveUserStatus = () => {
  const options = {
    method: 'POST',
    credentials: 'same-origin',
  };
  const url = 'user/logout';
  return new Promise((resolve, reject) => {
    fetch(url, options)
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
        reject(err);
      });
  });
}
