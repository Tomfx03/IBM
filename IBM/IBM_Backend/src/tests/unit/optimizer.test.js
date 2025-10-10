const optimizer = require('../../services/optimizerService');

describe('optimizerService', () => {
  it('should return recommendations for high energy usage', () => {
    const result = optimizer.generateRecommendations({ energy: 1200, pue: 1.8 });
    expect(result.length).toBeGreaterThan(0);
  });

  it('should suggest efficient cooling for high PUE', () => {
    const result = optimizer.generateRecommendations({ pue: 2.0 });
    expect(result.some(r => r.includes('cooling'))).toBe(true);
  });
});
