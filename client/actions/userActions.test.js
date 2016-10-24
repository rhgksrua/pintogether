'use strict';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'es6-promise';

chai.use(chaiAsPromised);

import * as types from '../reducers/actionTypes';
import * as actions from './userActions';

const middlewares = [ thunk, promiseMiddleware ];
const mockStore = configureMockStore(middlewares);

describe('userActions.js', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create an action to add user status', () => {
    const payload = { user: 'user' };

    fetchMock
      .mock('http://localhost:9876/user/login', payload)
      .catch(404);

    const expected = {
      type: types.ADD_USER_STATUS,
      payload: actions.checkUserStatus()
    };

    const store = mockStore({});
    const actual = actions.checkLogin();

    expect(actual).to.deep.equal(expected);
    return actual.payload.then((userInfo) => {
      expect(userInfo).to.deep.equal(payload);
    });
  });
  it('should create an action when authentication fails for retreiving user status', () => {
    fetchMock
      .mock('http://localhost:9876/user/login', 404)
      .catch(404);

    const expected = {
      type: types.ADD_USER_STATUS,
      payload: actions.checkUserStatus()
    };
    const store = mockStore({});
    const actual = actions.checkLogin();

    return actual.payload.then(() => {
      })
      .catch(err => {
        expect(err.message).to.equal('failed to authenticate');
      });
  });
  it('should create an action for loggin out', () => {
    const payload = { status: true };

    fetchMock
      .mock('http://localhost:9876/user/logout', payload)
      .catch(404);

    const expected = {
      type: types.REMOVE_USER_STATUS,
      payload: { promise: actions.removeUserStatus() }
    };

    const store = mockStore({});
    const actual = actions.logOut();

    expect(actual).to.deep.equal(expected);
  });
});

