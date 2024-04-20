import { isEmpty } from 'lodash-es';
import OperationsTransformer from '../../transformers/operation-transformer.js';
import Rules from '../rules/rules.js';
import {
  CASH_IN,
  CASH_OUT,
  JURIDICAL_USER,
  NATURAL_USER,
  ZERO_FEE,
} from '../../constants/constants.js';
import CalculateCashInFee from '../cash-in/calculate-cash-in-fee.js';
import CalculateCashOutJuridicalFee from '../cash-out/calculate-cash-out-juridical-fee.js';
import CalculateCashOutNaturalFee from '../cash-out/calculate-cash-out-natural-fee.js';

export class CalculateFees {
  static transformOperations(operations) {
    return operations.map((operation) => new OperationsTransformer(operation).transform());
  }

  constructor({
    cashInConfig = {},
    cashOutJuridicalConfig = {},
    cashOutNaturalConfig = {},
    operations = [],
  }) {
    this.operations = CalculateFees.transformOperations(operations);
    this.rules = new Rules({
      cashInConditions: cashInConfig,
      cashOutJuridicalConditions: cashOutJuridicalConfig,
      cashOutNaturalConditions: cashOutNaturalConfig,
    }).getTransformedRules();
  }

  getFees() {
    if (isEmpty(this.operations)) {
      return ZERO_FEE;
    }

    return this.operations.map((operation) => this.getFeeForTransaction(operation));
  }

  getFeeForTransaction(transaction) {
    let fee = ZERO_FEE;

    this.rules.forEach((rule) => {
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
