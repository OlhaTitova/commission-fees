import CalculateCashInFee from './calculate-cash-in-fee.js';

describe('CalculateCashInFee', () => {
  it('should return zero fee if there is no transaction and no rules', () => {
    const fee = new CalculateCashInFee({ transaction: {}, rule: {} }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it('should return zero fee if there is no transaction', () => {
    const cashInConfig = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    const fee = new CalculateCashInFee({ transaction: {}, rule: cashInConfig }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it('should return zero fee if there is no rules', () => {
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 100,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashInFee({ transaction, rule: {} }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it('should calculate the cash-in fee if amount < 1670', () => {
    const cashInConfig = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 500,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashInFee({ transaction, rule: cashInConfig }).calculateFee();
    expect(fee).toBe(0.15);
  });

  it('should calculate the cash-in fee if amount > 1670', () => {
    const cashInConfig = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 100000,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashInFee({ transaction, rule: cashInConfig }).calculateFee();
    expect(fee).toBe(5.00);
  });
});
