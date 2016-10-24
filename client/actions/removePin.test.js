'use strict';


import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { assert, expect } from 'chai';

import * as types from '../reducers/actionTypes';
import * as actions from './removePin';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('removePin.js', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create an action to remove user pin', () => {
    const pinId = "123";
    const expected = {
      type: types.REMOVE_USER_PIN,
      pinId
    };
    expect(actions.removeUserPin(pinId)).to.deep.equal(expected);
  });
  it('should create an action for remove pin server failure', () => {
    const expected = {
      type: types.REMOVE_USER_PIN_FAILED
    };
    expect(actions.removeUserPinFailed()).to.deep.equal(expected);
  });
  it('should dispatch remove user pin action after server ok', () => {
    const pinId = '123';
    fetchMock
      .mock('http://localhost:9876/pins', {})
      .catch(404);
    const expected = [
      {
        type: types.REMOVE_USER_PIN,
        pinId
      }
    ];
    const store = mockStore({ pins: [] });
    return store.dispatch(actions.removePin(pinId))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
  it('should dispatch remove pin failure after server returns error', () => {
    const pinId = '123';
    fetchMock
      .mock('http://localhost:9876/pins', {error: true})
      .catch(404);
    const expected = [
      {
        type: types.REMOVE_USER_PIN_FAILED
      }
    ];
    const store = mockStore({ pins: [] });
    return store.dispatch(actions.removePin(pinId))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
});
