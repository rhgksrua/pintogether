import request from 'supertest';
import server from './server';

describe('loading express from spec', function () {
  let serverInstance;
  beforeEach(function () {
    serverInstance = server.listen(3001, () => {
    });
  });
  afterEach(function () {
    serverInstance.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('returns 404 for invalid routes', function test404(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
