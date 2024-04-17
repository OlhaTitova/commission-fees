import CashOutNaturalConfigTransformer from "./cash-out-natural-transformer.js";

describe("CashOutNaturalConfigTransformer", () => {
  it("should return an empty object if there are no conditions", () => {
    expect(new CashOutNaturalConfigTransformer({})
      .transform()).toStrictEqual({});
  });

  it("should return an object with one condition", () => {
    const config = { percents: 0.3, week_limit: { amount: 1000, currency: "EUR"}}
    expect(new CashOutNaturalConfigTransformer(config).transform()).toStrictEqual({
      percents: 0.3,
      weekLimit: {
        amount: 1000,
        currency: "EUR"
      },
      transactionType: "cash_out",
      userType: "natural"
    });
  });
});
