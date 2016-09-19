'use strict';

import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';

export const checkImage = (url) => {
  return {
    type: 'CHECK_IMAGE',
    payload: {
      promise: checkImagePromise(url),
    }
  };
};



const checkImagePromise = (url) => {
  const options = {
    mode: 'no-cors'
  };
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(url);
        }
        return response.blob();
      })
      .then(blob => {
        console.log('blob type', blob);
        return resolve(url);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err.message);
      });
  });
};
