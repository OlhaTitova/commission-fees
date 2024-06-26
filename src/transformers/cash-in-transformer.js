import { isEmpty } from 'lodash-es';
import {
  CASH_IN,
  JURIDICAL_USER,
  NATURAL_USER,
} from '../constants/constants.js';

class CashInConfigTransformer {
  constructor(config = {}) {
    this.config = config;
  }

  transform() {
    if (isEmpty(this.config)) {
      return {};
    }

    const transformedObject = {
      percents: this.config.percents,
      max: {
        amount: this.config.max.amount,
        currency: this.config.max.currency,
      },
      transactionType: CASH_IN,
      userType: NATURAL_USER || JURIDICAL_USER,
    };
    return transformedObject;
  }
}

export default CashInConfigTransformer;
