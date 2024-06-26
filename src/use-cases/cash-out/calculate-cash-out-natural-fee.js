import { isEmpty, isEqual } from 'lodash-es';
import { CASH_OUT, NATURAL_USER, ZERO_FEE } from '../../constants/constants.js';

class CalculateCashOutNaturalFee {
  static computeRoundedFee({ amount, feePercent }) {
    const amountInCents = amount * 100;
    const roundedFeeInCent = Math.ceil((amountInCents * feePercent) / 100);

    return roundedFeeInCent / 100;
  }

  constructor({
    operations = [],
    transaction = {},
    rule = {},
  }) {
    this.operations = [...operations];
    this.rule = rule;
    this.transaction = transaction;
    this.fee = 0;
  }

  calculateFee() {
    if (isEmpty(this.transaction) || isEmpty(this.rule) || isEmpty(this.operations)) {
      return ZERO_FEE;
    }

    const { percents: feePercent } = this.rule;
    const weekAmount = this.getWeekAmount(this.transaction);
    const { amount: weekLimitAmount } = this.rule.weekLimit;
    const transactionAmount = this.transaction.operation.amount;
    const weekAmountWithoutLastTransaction = weekAmount - transactionAmount;

    if (weekAmountWithoutLastTransaction > weekLimitAmount) {
      return CalculateCashOutNaturalFee.computeRoundedFee({
        amount: transactionAmount,
        feePercent,
      });
    }

    if (weekAmount > weekLimitAmount) {
      const amountExceedingLimit = weekAmount - weekLimitAmount;

      if (amountExceedingLimit < transactionAmount) {
        return CalculateCashOutNaturalFee.computeRoundedFee({
          amount: amountExceedingLimit,
          feePercent,
        });
      }

      return CalculateCashOutNaturalFee.computeRoundedFee({
        amount: transactionAmount,
        feePercent,
      });
    }

    return ZERO_FEE;
  }

  getWeekAmount(transaction) {
    let weekAmount = 0;
    const weekStart = new Date(transaction.date);
    // from monday to sunday
    weekStart.setDate(
      weekStart.getDate() - weekStart.getDay() + (weekStart.getDay() === 0 ? -6 : 1),
    );

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
}

export default CalculateCashOutNaturalFee;
