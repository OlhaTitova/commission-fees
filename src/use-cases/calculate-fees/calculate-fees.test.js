import CalculateFees from './calculate-fees.js';
import {
  CASH_IN_CONFIG,
  CASH_OUT_JURIDICAL_CONFIG,
  CASH_OUT_NATURAL_CONFIG,
  DEFAULT_OPERATIONS_JSON,
} from '../../transformers/mock.js';

describe('CalculateFees', () => {
  it('should return zero fee if there is no operations', () => {
    const fees = new CalculateFees({
      operations: [],
      cashInConfig: {},
      cashOutJuridicalConfig: {},
      cashOutNaturalConfig: {},
    }).getFees();

    expect(fees).toBe(0);
  });

  it('should return fee for each transaction', () => {
    const operations = [
      {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: {
          amount: 30000,
          currency: 'EUR',
        },
      },
      {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_in',
        operation: {
          amount: 200,
          currency: 'EUR',
        },
      },
    ];

    const fees = new CalculateFees({
      operations,
      cashInConfig: CASH_IN_CONFIG,
      cashOutJuridicalConfig: CASH_OUT_JURIDICAL_CONFIG,
      cashOutNaturalConfig: CASH_OUT_NATURAL_CONFIG,
    }).getFees();

    expect(fees).toStrictEqual([87, 0.06]);
  });

  it('should return fee for each transaction', () => {
    const fees = new CalculateFees({
      operations: DEFAULT_OPERATIONS_JSON,
      cashInConfig: CASH_IN_CONFIG,
      cashOutJuridicalConfig: CASH_OUT_JURIDICAL_CONFIG,
      cashOutNaturalConfig: CASH_OUT_NATURAL_CONFIG,
    }).getFees();

    expect(fees).toStrictEqual([0.06, 0.9, 87, 3, 0.3, 0.3, 5, 0, 0]);
  });
});
