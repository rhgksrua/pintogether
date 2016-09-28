'use strict';

import { logOut } from '../actions/userActions';

function logOutUser(nextState, replace, callback) {
  const { dispatch } = this;
  dispatch(logOut());
  replace('/');
  callback();
};

export default logOutUser;
