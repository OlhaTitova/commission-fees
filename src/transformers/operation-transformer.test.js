import OperationTransformer from './operation-transformer.js';

describe('OperationTransformer', () => {
  it('should return an empty object if there are no conditions', () => {
    expect(new OperationTransformer({})
      .transform()).toStrictEqual({});
  });

  it('should return an object with the same properties as the input object', () => {
    const operation = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: {
        amount: 200,
        currency: 'EUR',
      },
    };
    expect(new OperationTransformer(operation).transform()).toStrictEqual({
      date: '2016-01-05',
      userId: 1,
      userType: 'natural',
      type: 'cash_out',
      operation: {
        amount: 200,
        currency: 'EUR',
      },
      process: false,
    });
  });
});
