import CalculateCashOutNaturalFee from "./calculate-cash-out-natural-fee.js";
import {DEFAULT_OPERATIONS} from "../../constants/constants.js";

const DEFAULT_RULE = {
  percents: 0.3,
  weekLimit: {
    amount: 1000,
    currency: "EUR"
  }
}

describe("CalculateCashOutNaturalFee", () => {
  it("should return zero fee if there is no operations, no transaction and no rules", () => {
    const fee = new CalculateCashOutNaturalFee({
      operations: [],
      transaction: {},
      rule: {}
    }).calculateFee();

    expect(fee).toBe(0.00);
  });

  it("should return zero fee if there is no operations", () => {
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: {
        amount: 100,
        currency: "EUR"
      }
    }
    const fee = new CalculateCashOutNaturalFee({
      operations: [],
      transaction,
      rule: {}
    }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it("should return zero fee if there is no transaction", () => {
    const fee = new CalculateCashOutNaturalFee({
      operations: DEFAULT_OPERATIONS,
      transaction: {},
      rule: DEFAULT_RULE
    }).calculateFee();

    expect(fee).toBe(0.00);
  });

  it("should return zero fee if there is no rules", () => {
    const transaction = {
      date: '2016-01-05',
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: {
        amount: 100,
        currency: "EUR"
      }
    }
    const fee = new CalculateCashOutNaturalFee({
      operations: DEFAULT_OPERATIONS,
      transaction,
      rule: {}
    }).calculateFee();
    expect(fee).toBe(0.00);
  });

  it(`should calculate default fee in case if total cash out amount per week
    (from monday to sunday) is exceeded default amount for one user`, () => {
    const transaction = {
      date: '2016-01-07',
      userId: 1,
      userType: 'natural',
      type: 'cash_out',
      operation: {
        amount: 100,
        currency: 'EUR'
      },
      process: false
    }

    const fee = new CalculateCashOutNaturalFee({
      operations: DEFAULT_OPERATIONS,
      transaction,
      rule: DEFAULT_RULE
    }).calculateFee();

    expect(fee).toBe(90.60);
  });

  it(`should calculate zero fee in case if total cash out amount per week
    (from monday to sunday) is less then default amount for one user`, () => {
    const transaction = {
      date: '2016-01-10',
      userId: 3,
      userType: 'natural',
      type: 'cash_out',
      operation: {
        amount: 1000,
        currency: 'EUR'
      },
      process: false
    }

    const fee = new CalculateCashOutNaturalFee({
      operations: DEFAULT_OPERATIONS,
      transaction,
      rule: DEFAULT_RULE
    }).calculateFee();

    expect(fee).toBe(0.00);
  });

});
