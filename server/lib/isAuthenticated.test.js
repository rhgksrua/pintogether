import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import isAuthenticated from './isAuthenticated';

describe('isAuthenticated - ExpressJS middleware', () => {
  let next;
  let json;
  let res;
  let req;
  let sendStatus;
  beforeEach(() => {
    next = sinon.spy();
    sendStatus = sinon.spy();
    res = { json, sendStatus };
    req = {};
  });
  it('fails authentication with no user', () => {
    req.isAuthenticated = () => {
      return false;
    };
    isAuthenticated(req, res, next);
    expect(res.sendStatus.calledOnce).to.equal(true);
  });
  it('should authenticate with valid user', () => {
    req.isAuthenticated = () => {
      return true;
    };
    isAuthenticated(req, res, next);
    expect(next.calledOnce).to.equal(true);
  });

});
