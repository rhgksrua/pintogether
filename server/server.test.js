import request from 'supertest';
import server from './server';

describe('Server routes from expressjs', function () {
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
  it('lets client to handle 404', function test404(done) {
    request(server)
      .get('/foo/bar')
      .expect(200, done);
  });
});
