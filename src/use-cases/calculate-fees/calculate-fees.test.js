import {CalculateFees} from "./calculate-fees.js";
import {DEFAULT_OPERATIONS} from "../../constants/constants.js";

describe("CalculateFees", () => {
  it("should return zero fee if there is no operations", () => {
    const fee = new CalculateFees({
      operations: [],
      cashInConfig: {},
      cashOutJuridicalConfig: {},
      cashOutNaturalConfig: {}
    }).getFees();

    expect(fee).toBe(0.00);
  });

  it("should return fee for each transaction", () => {
    const operations = [
      {
        date: '2016-01-05',
        user_id: 1,
        user_type: "natural",
        type: "cash_out",
        operation: {
          amount: 100,
          currency: "EUR"
        }
      },
      {
        date: '2016-01-06',
        user_id: 2,
        user_type: "juridical",
        type: "cash_in",
        operation: {
          amount: 200,
          currency: "EUR"
        }
      }
    ]
    const cashInConfig = { percents: 0.03, max: { amount: 5, currency: "EUR"}}
    const cashOutJuridicalConfig = { percents: 0.3, min: { amount: 0.5, currency: "EUR"}}
    const cashOutNaturalConfig = { percents: 0.3, week_limit: { amount: 1000, currency: "EUR"}}
    const fee = new CalculateFees({
      operations,
      cashInConfig,
      cashOutJuridicalConfig,
      cashOutNaturalConfig
    }).getFees();

    expect(fee).toStrictEqual([0.00, 0.06]);
  });

  it("should return fee for each transaction", () => {
    const operations = DEFAULT_OPERATIONS
    const cashInConfig = { percents: 0.03, max: { amount: 5, currency: "EUR"}}
    const cashOutJuridicalConfig = { percents: 0.3, min: { amount: 0.5, currency: "EUR"}}
    const cashOutNaturalConfig = { percents: 0.3, week_limit: { amount: 1000, currency: "EUR"}}
    const fee = new CalculateFees({
      operations,
      cashInConfig,
      cashOutJuridicalConfig,
      cashOutNaturalConfig
    }).getFees();

    expect(fee).toStrictEqual([0.06, 0, 0, 0, 0, 0, 5, 0, 0]);
  });
});


