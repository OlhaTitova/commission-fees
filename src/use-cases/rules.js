import CashInConfigTransformer from '../transformers/cash-in.js';
import CashOutJuridicalConfigTransformer from '../transformers/cash-out-juridical.js';
import CashOutNaturalConfigTransformer from '../transformers/cash-out-natural.js';

export default class Rules {
  constructor(cashInConditions, cashOutJuridicalConditions, cashOutNaturalConditions) {
    this.cashInConditions = cashInConditions;
    this.cashOutJuridicalConditions = cashOutJuridicalConditions;
    this.cashOutNaturalConditions = cashOutNaturalConditions;
    this.rules = [];
  }

  getTransformedRules() {
    const transformedCashInConditions = CashInConfigTransformer.transform(this.cashInConditions);
    const transformedCashOutJuridicalConditions = CashOutJuridicalConfigTransformer
      .transform(this.cashOutJuridicalConditions);
    const transformedCashOutNaturalConditions = CashOutNaturalConfigTransformer
      .transform(this.cashOutNaturalConditions);

    this.rules.push(transformedCashInConditions);
    this.rules.push(transformedCashOutJuridicalConditions);
    this.rules.push(transformedCashOutNaturalConditions);

    return this.rules;
  }
}
