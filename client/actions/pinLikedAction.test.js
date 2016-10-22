'use strict';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'es6-promise';

chai.use(chaiAsPromised);

import * as types from '../reducers/actionTypes';
import * as actions from './pinLikedAction';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('pinLikedAction.js', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create an action to update use liked', () => {
    const payload = {};
    const expected = {
      type: types.UPDATE_LIKED,
      payload
    }
    expect(actions.updateLiked(payload)).to.deep.equal(expected);
  });
  it('should create an action for liked server failure', () => {
    const expected = {
      type: types.UPDATE_LIKED_FAILED
    };
    expect(actions.updateLikedFailed()).to.deep.equal(expected);
  });
  it('should dispatch updateLiked after posting user liked', () => {
    const pinId = '123';
    const userId = 'abcdefg';
    fetchMock
      .mock('http://localhost:9876/pins/like', { id: userId })
      .catch(404);
    const expected = [
      {
        type: types.UPDATE_LIKED,
        payload: {
          pinId,
          userId
        }
      }
    ];
    const store = mockStore({ pins: [] });
    return store.dispatch(actions.pinLiked(pinId))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
});
