import CashInConfigTransformer from '../../transformers/cash-in-transformer.js';
import CashOutJuridicalConfigTransformer from '../../transformers/cash-out-juridical-transformer.js';
import CashOutNaturalConfigTransformer from '../../transformers/cash-out-natural-transformer.js';
import pkg from 'lodash/fp.js';

const { isEmpty } = pkg;

export default class Rules {
  constructor({
                cashInConditions =  {},
                cashOutJuridicalConditions = {},
                cashOutNaturalConditions = {},
  }) {
    this.cashInConditions = cashInConditions;
    this.cashOutJuridicalConditions = cashOutJuridicalConditions;
    this.cashOutNaturalConditions = cashOutNaturalConditions;
    this.rules = [];
  }

  getTransformedRules() {
    if(isEmpty(this.cashInConditions) && isEmpty(this.cashOutJuridicalConditions) && isEmpty(this.cashOutNaturalConditions)){
      return [];
    }
    if(!isEmpty(this.cashInConditions)) {
      this.rules.push(new CashInConfigTransformer(this.cashInConditions).transform());
    }
    if (!isEmpty(this.cashOutJuridicalConditions)) {
      this.rules.push(new CashOutJuridicalConfigTransformer(this.cashOutJuridicalConditions).transform());
    }
    if (!isEmpty(this.cashOutNaturalConditions)) {
      this.rules.push(new CashOutNaturalConfigTransformer(this.cashOutNaturalConditions).transform());
    }

    return this.rules;
  }
}
