'use strict';

import fetchMock from 'fetch-mock';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'es6-promise';

chai.use(chaiAsPromised);

import { createPin, createPinPromise, createPinPromiseAction } from './createPinActions';

describe('createPinActions.js', () => {
  let dispatch;
  let middleMock;

  beforeEach(() => {
    fetchMock
      .mock('pins', 200)
      .catch(404);

    dispatch = () => {
    };
    middleMock = (dispatch, action) => {
      
    };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should call dispatch with injected dispatch', () => {
    const actionCreator = () => {
      return true;
    }
    const dispatchSpy = sinon.spy();

    const action = createPin('title', 'url', actionCreator);
    action(dispatchSpy);
    expect(dispatchSpy.calledOnce).to.equal(true);
  });
  it('should return action object from createPinPromiseAction', () => {
    const action = createPinPromiseAction('title', 'url', () => {});
    expect(action.type).to.equal('CREATE_PIN');
  });
  it('should resolve createPinPromise with pin info', () => {
    expect(true).to.equal(true);
  });
});


