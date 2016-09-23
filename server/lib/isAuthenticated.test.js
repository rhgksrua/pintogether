import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import isAuthenticated from './isAuthenticated';

describe('ExpressJS middleware', () => {
  let next;
  let json;
  let res;
  beforeEach(() => {
    next = sinon.spy();
    json = sinon.spy();
    res = { json };
  });
  it('fails authentication with no user', () => {
    const req = {};
    isAuthenticated(req, res, next);
    expect(res.json.calledOnce).to.equal(true);
  });
  it('should authenticate with valid user', () => {
    const req = {
      user: {
        authenticated: true
      }
    };
    isAuthenticated(req, res, next);
    expect(next.calledOnce).to.equal(true);

  });

});
