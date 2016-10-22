'use strict';

import * as types from '../reducers/actionTypes';

/**
 * toggleMenu
 *
 * Toggles mobile menu.
 *
 * @returns {undefined}
 */
export const toggleMenu = () => {
  return {
    type: types.TOGGLE_MENU
  };
}
