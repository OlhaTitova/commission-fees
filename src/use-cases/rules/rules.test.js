import Rules from './rules.js';
import {
  CASH_IN,
  CASH_OUT,
  JURIDICAL_USER,
  NATURAL_USER,
} from '../../constants/constants.js';

describe('Rules', () => {
  it('should return an empty array if there are no conditions', () => {
    expect(new Rules({})
      .rules).toStrictEqual([]);
  });

  it('should return an array with one object if there is one condition', () => {
    const cashInConditions = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    expect(new Rules({
      cashInConditions,
    }).rules).toStrictEqual([{
      percents: 0.03,
      max: {
        amount: 5,
        currency: 'EUR',
      },
      transactionType: CASH_IN,
      userType: NATURAL_USER || JURIDICAL_USER,
    }]);
  });

  it('should return an array with two objects if there are two conditions', () => {
    const cashInConditions = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    const cashOutJuridicalConditions = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    expect(new Rules({
      cashInConditions,
      cashOutJuridicalConditions,
    }).rules).toStrictEqual([{
      percents: 0.03,
      max: {
        amount: 5,
        currency: 'EUR',
      },
      transactionType: CASH_IN,
      userType: NATURAL_USER || JURIDICAL_USER,
    },
    {
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR',
      },
      transactionType: CASH_OUT,
      userType: JURIDICAL_USER,
    },
    ]);
  });

  it('should return an array with three objects if there are three conditions', () => {
    const cashInConditions = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
    const cashOutJuridicalConditions = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
    const cashOutNaturalConditions = { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } };
    expect(new Rules({
      cashInConditions,
      cashOutJuridicalConditions,
      cashOutNaturalConditions,
    }).rules).toStrictEqual([{
      percents: 0.03,
      max: {
        amount: 5,
        currency: 'EUR',
      },
      transactionType: CASH_IN,
      userType: NATURAL_USER || JURIDICAL_USER,
    },
    {
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR',
      },
      transactionType: CASH_OUT,
      userType: JURIDICAL_USER,
    },
    {
      percents: 0.3,
      weekLimit: {
        amount: 1000,
        currency: 'EUR',
      },
      transactionType: CASH_OUT,
      userType: NATURAL_USER,
    },
    ]);
  });
});
