'use strict';

import Promise from 'bluebird';
import 'isomorphic-fetch';

export const checkImage = (url) => {
  return {
    type: 'CHECK_IMAGE',
    payload: {
      promise: checkImagePromise(url),
    }
  };
};

export const checkImagePromise = (url) => {
  const options = {
    mode: 'no-cors'
  };
  return new Promise((resolve, reject) => {
    if (!/\.gif$|\.jpg$|\.png$/.test(url)) {
      return reject(new Error('invalid ext'));
    }
    fetch(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('url 404');
        }
        return response.blob();
      })
      .then(blob => {
        return resolve(url);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
