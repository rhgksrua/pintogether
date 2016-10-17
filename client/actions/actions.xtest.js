'use strict';

import fetchMock from 'fetch-mock';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'es6-promise';

import { checkImagePromise } from './actions';

chai.use(chaiAsPromised);

describe('actions.js', () => {
  beforeEach(() => {
    fetchMock
      .mock('cat.gif', 200)
      .catch(404);
  });

  afterEach(() => {
    fetchMock.restore();
  });
  describe('checkImagePromise', () => {
    it('should reject promise with invalid file extension', () => {
      const expected = checkImagePromise('cat');
      return expect(expected).to.eventually.rejected;
    });
    it('should reject promise with invalid url', () => {
      const expected = checkImagePromise('invalid.gif');
      return expect(expected).to.eventually.be.rejectedWith('url 404');
      //return assert.isRejected(expected, Error, 'url 404');
    });
    it('should resolve promise in checkImagePromise()', () => {
      const expected = checkImagePromise('cat.gif');
      return expect(expected).to.eventually.equal('cat.gif');
    });
  });
});

