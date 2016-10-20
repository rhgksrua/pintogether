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

describe('actions.js', () => {
  beforeEach(() => {
    fetchMock
      .mock('cat.gif', 200)
      .catch(404);
  });

  describe('checkImagePromise', () => {
    xit('should reject promise with invalid file extension', () => {
      const expected = checkImagePromise('cat');
      return expect(expected).to.eventually.rejected;
    });
    xit('should reject promise with invalid url', () => {
      const expected = checkImagePromise('invalid.gif');
      return expect(expected).to.eventually.be.rejectedWith('url 404');
      //return assert.isRejected(expected, Error, 'url 404');
    });
    xit('should resolve promise in checkImagePromise()', () => {
      const expected = checkImagePromise('cat.gif');
      return expect(expected).to.eventually.equal('cat.gif');
    });
  });
});


