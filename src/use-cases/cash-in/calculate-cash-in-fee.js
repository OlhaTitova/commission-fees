import { ZERO_FEE } from '../../constants/constants.js';

export default class CalculateCashInFee {
  constructor({ transaction, rule }) {
    this.rule = rule;
    this.transaction = transaction;
    this.fee = 0;
  }

  calculateFee() {
    if (!this.transaction && !this.transaction.operation) {
      return ZERO_FEE;
    }
    const { percents: feePercent } = this.rule;
    const { amount } = this.transaction.operation;
    const roundedFee = this.computeRoundedFee({ amount, feePercent });
    const maxFee = this.rule.max.amount;

    if (roundedFee > maxFee) {
      return maxFee.toFixed(2);
    }

    return roundedFee;
  }

  computeRoundedFee({ amount, feePercent }) {
    const amountInCents = amount * 100;
    const feeInCents = (amountInCents * feePercent) / 100;
    this.fee = feeInCents / 100;

    return this.roundFeeToTwo();
  }

  roundFeeToTwo() {
    return (Math.ceil(this.fee * 100) / 100).toFixed(2);
  }
}
