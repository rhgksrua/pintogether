'use strict';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'es6-promise';

chai.use(chaiAsPromised);

import * as types from '../reducers/actionTypes';
import * as actions from './pinsActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('pinsActions.js', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create an action to update all pins', () => {
    const allPins = [];
    const expected = {
      type: types.FETCH_ALL_PINS,
      allPins
    }
    expect(actions.receivePins(allPins)).to.deep.equal(expected);
  });
  it('should create an action for failing to fetch all pins', () => {
    const expected = {
      type: types.FETCH_ALL_PINS_FAILED
    };
    expect(actions.receivePinsFailed()).to.deep.equal(expected);
  });
  it('should dispatch updateLiked after posting user liked', () => {
    const allPins = [];
    fetchMock
      .mock('http://localhost:9876/pins', { pins: allPins })
      .catch(404);
    const expected = [
      {
        type: types.FETCH_ALL_PINS,
        allPins: {
          pins: allPins
        }
      }
    ];
    const store = mockStore({ pins: [] });
    return store.dispatch(actions.fetchAllPins(allPins))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
  });
});

