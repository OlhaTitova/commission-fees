import { isEmpty } from 'lodash-es';
import { ZERO_FEE } from '../../constants/constants.js';

class CalculateCashOutJuridicalFee {
  static computeRoundedFee({ amount, feePercent }) {
    const amountInCents = amount * 100;
    const roundedFeeInCent = Math.ceil((amountInCents * feePercent) / 100);

    return roundedFeeInCent / 100;
  }

  constructor({
    transaction = {},
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
    const roundedFee = CalculateCashOutJuridicalFee.computeRoundedFee({ amount, feePercent });
    const minFee = this.rule.min.amount;

    if (roundedFee < minFee) {
      return minFee;
    }

    return roundedFee;
  }
}

export default CalculateCashOutJuridicalFee;
