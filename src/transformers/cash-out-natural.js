import { CASH_OUT, NATURAL_USER } from '../constants/constants.js';

export default class CashOutNaturalConfigTransformer {
  static transform(config) {
    const transformedObject = {
      percents: config.percents,
      weekLimit: {
        amount: config.week_limit.amount,
        currency: config.week_limit.currency,
      },
      transactionType: CASH_OUT,
      userType: NATURAL_USER,
    };
    return transformedObject;
  }
}
