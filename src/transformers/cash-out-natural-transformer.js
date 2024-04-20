import { isEmpty } from 'lodash-es';
import { CASH_OUT, NATURAL_USER } from '../constants/constants.js';

export default class CashOutNaturalConfigTransformer {
  constructor(config = {}) {
    this.config = config;
  }

  transform() {
    if (isEmpty(this.config)) {
      return {};
    }

    const transformedObject = {
      percents: this.config.percents,
      weekLimit: {
        amount: this.config.week_limit.amount,
        currency: this.config.week_limit.currency,
      },
      transactionType: CASH_OUT,
      userType: NATURAL_USER,
    };
    return transformedObject;
  }
}
