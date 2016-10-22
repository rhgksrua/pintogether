'use strict';

import { assert, expect } from 'chai';
import * as types from '../reducers/actionTypes';

import { toggleMenu } from './navActions';

describe('navActions.js', () => {
  it('should create an action to toggle mobile menu', () => {
    const expectedAction = {
      type: types.TOGGLE_MENU
    };
    expect(toggleMenu()).to.deep.equal(expectedAction);
  });
});
