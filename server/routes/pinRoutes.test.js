import request from 'supertest';
import server from '../server';

describe('pinRoutes.js - Server routes for pin CRUD', function () {
  let serverInstance;
  beforeEach(function () {
    serverInstance = server.listen(3001, () => {
    });
  });
  afterEach(function () {
    serverInstance.close();
  });
  it('fails authentication for POST /pins', function testSlash(done) {
    const newPin = {
      url: 'https://localhost',
      title: 'super duper title'
    };
    request(server)
      .post('/pins')
      .send(newPin)
      .expect(404, done);
  });
});

