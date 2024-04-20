import { isEmpty } from 'lodash-es';
import CashInConfigTransformer from '../../transformers/cash-in-transformer.js';
import CashOutJuridicalConfigTransformer from '../../transformers/cash-out-juridical-transformer.js';
import CashOutNaturalConfigTransformer from '../../transformers/cash-out-natural-transformer.js';

class Rules {
  constructor({
    cashInConditions = {},
    cashOutJuridicalConditions = {},
    cashOutNaturalConditions = {},
  }) {
    this.rules = [
      new CashInConfigTransformer(cashInConditions).transform(),
      new CashOutJuridicalConfigTransformer(cashOutJuridicalConditions).transform(),
      new CashOutNaturalConfigTransformer(cashOutNaturalConditions).transform(),
    ].filter((rule) => !isEmpty(rule));
  }
}

export default Rules;
