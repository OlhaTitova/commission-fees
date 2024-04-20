import CashOutJuridicalConfigTransformer from './cash-out-juridical-transformer.js';

describe('CashOutJuridicalConfigTransformer', () => {
  it('should return an empty object if there are no conditions', () => {
    expect(new CashOutJuridicalConfigTransformer({})
      .transform()).toStrictEqual({});
  });

  it('should return an object with one condition', () => {
    const config = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    expect(new CashOutJuridicalConfigTransformer(config).transform()).toStrictEqual({
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR',
      },
      transactionType: 'cash_out',
      userType: 'juridical',
    });
  });
});
