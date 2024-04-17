import CashInConfigTransformer from "./cash-in-transformer.js";

describe("CashInConfigTransformer", () => {
  it("should return an empty object if there are no conditions", () => {
    expect(new CashInConfigTransformer({})
      .transform()).toStrictEqual({});
  });

  it("should return an object with one condition", () => {
    const config = { percents: 0.03, max: { amount: 5, currency: "EUR"}}
    expect(new CashInConfigTransformer(config).transform()).toStrictEqual({
      percents: 0.03,
      max: {
        amount: 5,
        currency: "EUR"
      },
      transactionType: "cash_in",
      userType: "natural" || "juridical"
    });
  });
});
