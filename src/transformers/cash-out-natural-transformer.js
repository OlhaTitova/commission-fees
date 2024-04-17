import { CASH_OUT, NATURAL_USER } from '../constants/constants.js';
import pkg from 'lodash/fp.js';

const { isEmpty } = pkg;

export default class CashOutNaturalConfigTransformer {
  constructor(config = {}) {
    this.config = config;
  }
  transform() {
    if(isEmpty(this.config)){
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
