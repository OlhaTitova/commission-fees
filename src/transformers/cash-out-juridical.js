import { CASH_OUT, JURIDICAL_USER } from '../constants/constants.js';

export default class CashOutJuridicalConfigTransformer {
  static transform(config) {
    const transformedObject = {
      percents: config.percents,
      min: {
        amount: config.min.amount,
        currency: config.min.currency,
      },
      transactionType: CASH_OUT,
      userType: JURIDICAL_USER,
    };
    return transformedObject;
  }
}
