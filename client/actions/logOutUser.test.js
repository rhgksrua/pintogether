'use strict';

import chai, { assert, expect } from 'chai';

import logOutUser from './logOutUser';

describe.skip('logOutUser.js - onEnter hook for react-router', () => {
  it('should logout user and redirect user to home', () => {
    const nextState = {};
    const replace = sinon.spy();
    const callback = sinon.spy();
    const dispatch = sinon.spy();
    logOutUser.call({ dispatch }, nextState, replace, callback);
    expect(dispatch.calledOnce).to.equal(true);
    expect(replace.calledWith('/')).to.equal(true);
    expect(callback.calledOnce).to.equal(true);
  });
});
