import { isEmpty } from 'lodash-es';
import {
  CASH_OUT,
  JURIDICAL_USER,
} from '../constants/constants.js';

class CashOutJuridicalConfigTransformer {
  constructor(config = {}) {
    this.config = config;
  }

  transform() {
    if (isEmpty(this.config)) {
      return {};
    }

    const transformedObject = {
      percents: this.config.percents,
      min: {
        amount: this.config.min.amount,
        currency: this.config.min.currency,
      },
      transactionType: CASH_OUT,
      userType: JURIDICAL_USER,
    };
    return transformedObject;
  }
}

export default CashOutJuridicalConfigTransformer;
