import CalculateCashOutJuridicalFee from './calculate-cash-out-juridical-fee.js';

describe('CalculateCashOutJuridicalFee', () => {
  it('should return zero fee if there is no transaction and no rules', () => {
    const fee = new CalculateCashOutJuridicalFee({ transaction: {}, rule: {} }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it('should return zero fee if there is no transaction', () => {
    const cashOutConfig = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    const fee = new CalculateCashOutJuridicalFee({
      transaction: {},
      rule: cashOutConfig,
    }).calculateFee();

    expect(fee).toBe(0.00);
  });

  it('should return zero fee if there is no rules', () => {
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: {
        amount: 100,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashOutJuridicalFee({ transaction, rule: {} }).calculateFee();

    expect(fee).toBe(0.00);
  });

  it('should calculate min fee if the cash-out fee < min fee', () => {
    const cashOutConfig = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: {
        amount: 1000,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashOutJuridicalFee({
      transaction,
      rule: cashOutConfig,
    }).calculateFee();

    expect(fee).toBe(3.00);
  });

  it('should calculate the cash-out fee', () => {
    const cashOutConfig = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: {
        amount: 10,
        currency: 'EUR',
      },
    };
    const fee = new CalculateCashOutJuridicalFee({
      transaction,
      rule:
      cashOutConfig,
    }).calculateFee();

    expect(fee).toBe(0.50);
  });
});
