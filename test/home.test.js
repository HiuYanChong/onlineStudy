const request = require('supertest');
const app =require('../index.js');

describe('home_page', () => {
  it('should visit the home page sucessfully', () => {
    request(app.listen())
      .get('/home')
      .expect(200)
  });
});