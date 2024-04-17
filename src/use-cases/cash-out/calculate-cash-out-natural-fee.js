import pkg from 'lodash/fp.js';
import { CASH_OUT, NATURAL_USER, ZERO_FEE } from '../../constants/constants.js';

export default class CalculateCashOutNaturalFee {
  constructor({
    operations,
    transaction,
    rule,
  }) {
    this.operations = [...operations];
    this.rule = rule;
    this.transaction = transaction;
    this.fee = 0;
  }

  calculateFee() {
    if (!this.transaction || !this.transaction.operation || !this.rule) {
      return ZERO_FEE;
    }
    const { percents: feePercent } = this.rule;
    const weekAmount = this.getWeekAmount(this.transaction);
    const { amount: weekLimitAmount } = this.rule.weekLimit;

    if (weekAmount > weekLimitAmount) {
      const amountExceeded = weekAmount - weekLimitAmount;
      return this.computeRoundedFee({
        amount: amountExceeded,
        feePercent,
      });
    }

    return ZERO_FEE.toFixed(2);
  }

  getWeekAmount(transaction) {
    let weekAmount = 0;
    const weekStart = new Date(transaction.date);
    // from monday to sunday
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekOperations = this.operations.filter((operation) => {
      const operationDate = new Date(operation.date);

      return (operationDate >= weekStart)
        && (operationDate <= weekEnd)
        && (operation.userId === transaction.userId)
        && (operation.type === CASH_OUT)
        && (operation.userType === NATURAL_USER);
    });

    weekOperations.forEach((operation) => {
      if (!transaction.process) {
        weekAmount += operation.operation.amount;
        this.getNextOperation(operation);
      }

      return weekAmount;
    });

    return weekAmount;
  }

  getNextOperation(operation) {
    const { isEqual } = pkg;

    return this.operations.forEach((op, index) => {
      if (!op.process) {
        if (isEqual(op, operation)) {
          this.operations[index].process = true;
          return this.operations[index + 1];
        }
      }
      return this.operations[index + 1];
    });
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
