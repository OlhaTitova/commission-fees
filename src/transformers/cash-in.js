import { CASH_IN, JURIDICAL_USER, NATURAL_USER } from '../constants/constants.js';

export default class CashInConfigTransformer {
  static transform(config) {
    const transformedObject = {
      percents: config.percents,
      max: {
        amount: config.max.amount,
        currency: config.max.currency,
      },
      transactionType: CASH_IN,
      userType: NATURAL_USER || JURIDICAL_USER,
    };
    return transformedObject;
  }
}
