import { ZERO_FEE } from '../../constants/constants.js';
import pkg from 'lodash/fp.js';

const { isEmpty } = pkg;

export default class CalculateCashOutJuridicalFee {
  constructor({
    transaction= {},
    rule = {},
  }) {
    this.rule = rule;
    this.transaction = transaction;
    this.fee = 0;
  }

  calculateFee() {
    if (isEmpty(this.transaction) || isEmpty(this.rule)) {
      return ZERO_FEE;
    }
    const { percents: feePercent } = this.rule;

    const { amount } = this.transaction.operation;
    const roundedFee = this.computeRoundedFee({ amount, feePercent });
    const minFee = this.rule.min.amount;

    if (roundedFee < minFee) {
      return minFee;
    }

    return roundedFee;
  }

  computeRoundedFee({ amount, feePercent }) {
    const amountInCents = amount * 100;
    const roundedFeeInCent = Math.ceil((amountInCents * feePercent) / 100);

    return roundedFeeInCent / 100;
  }
}
