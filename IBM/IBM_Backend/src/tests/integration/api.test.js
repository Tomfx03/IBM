const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');

describe('API Integration', () => {
  let token;
  beforeAll(() => {
    token = jwt.sign({ id: 'test-user' }, process.env.JWT_SECRET || 'testsecret');
  });

  it('GET /api/reports should return 200', async () => {
    const res = await request(app)
      .get('/api/reports')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/simulate should return simulated data', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .set('Authorization', `Bearer ${token}`)
      .send({ adjustments: { efficiency: 10, coolingImprovement: 2 } });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('simulatedEnergy');
  });
});
