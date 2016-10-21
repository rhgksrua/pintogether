'use strict';

import { logOut } from '../actions/userActions';

/**
 * onEnter hook for react router
 *
 * @param nextState
 * @param replace
 * @param callback
 * @returns {undefined}
 */
function logOutUser(nextState, replace, callback) {
  const { dispatch } = this;
  dispatch(logOut());
  replace('/');
  callback();
};

export default logOutUser;
