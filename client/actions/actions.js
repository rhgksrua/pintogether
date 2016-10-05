'use strict';

export const checkImage = (url) => {
  return {
    type: 'CHECK_IMAGE',
    payload: {
      promise: checkImagePromise(url),
    }
  };
};

export const xcheckImagePromise = (url) => {
  const options = {
    mode: 'no-cors'
  };
  return fetch(url, options)
    .then(res => {
      if (res.status >= 400) {
        throw new Error('failed');
      }
      return res.blob();
    })
    .then(img => {
      Promise.resolve(url);
    })
    .catch(err => {
      Promise.reject(err);
    });
};

export const checkImagePromise = (url) => {
  const options = {
    mode: 'no-cors'
  };
  return new Promise((resolve, reject) => {
    if (!/\.gif$|\.jpg$|\.jpeg$|\.png$/.test(url)) {
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
