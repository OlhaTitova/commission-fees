import OperationsTransformer from '../transformers/operation.js';
import Rules from './rules.js';
import {
  CASH_IN, CASH_OUT, JURIDICAL_USER, NATURAL_USER, ZERO_FEE,
} from '../constants/constants.js';
import CalculateCashInFee from './cash-in/calculate-cash-in-fee.js';
import CalculateCashOutJuridicalFee from './cash-out/calculate-cash-out-juridical-fee.js';
import CalculateCashOutNaturalFee from './cash-out/calculate-cash-out-natural-fee.js';

export class CalculateFees {
  constructor({
    cashInJson = {},
    cashOutJuridicalJson = {},
    cashOutNaturalJson = {},
    operations = [],
  }) {
    this.operations = [...operations];
    this.cashInJson = cashInJson;
    this.cashOutJuridicalJson = cashOutJuridicalJson;
    this.cashOutNaturalJson = cashOutNaturalJson;
  }

  getFee() {
    this.transformOperations();

    this.operations.forEach((operation) => {
      const fee = this.getFeeForTransaction(operation);

      console.log(fee);
      return fee;
    });
  }

  transformOperations() {
    this.operations.forEach((operation, index) => {
      this.operations[index] = OperationsTransformer.transform(operation);
    });
    return this.operations;
  }

  getFeeForTransaction(transaction) {
    const rules = new Rules(this.cashInJson, this.cashOutJuridicalJson, this.cashOutNaturalJson)
      .getTransformedRules();

    let fee = ZERO_FEE;
    rules.forEach((rule) => {
      const isCashInOperation = transaction.type === CASH_IN && rule.transactionType === CASH_IN;
      const isCashOutOperation = transaction.type === CASH_OUT && rule.transactionType === CASH_OUT;
      const isJuridicalUser = (transaction.userType === JURIDICAL_USER)
        && (rule.userType === JURIDICAL_USER);
      const isNaturalUser = transaction.userType === NATURAL_USER && rule.userType === NATURAL_USER;

      if (isCashInOperation) {
        fee = new CalculateCashInFee({
          transaction,
          rule,
        }).calculateFee();
      }
      if (isCashOutOperation) {
        if (isJuridicalUser) {
          fee = new CalculateCashOutJuridicalFee({
            transaction,
            rule,
          }).calculateFee();
        }
        if (isNaturalUser) {
          fee = new CalculateCashOutNaturalFee({
            operations: this.operations,
            transaction,
            rule,
          }).calculateFee();
        }
      }
    });

    return fee;
  }
}
