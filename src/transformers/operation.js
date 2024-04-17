export default class OperationsTransformer {
  static transform(object) {
    const transformedObject = {
      date: object.date,
      userId: object.user_id,
      userType: object.user_type,
      type: object.type,
      operation: {
        amount: object.operation.amount,
        currency: object.operation.currency,
      },
      process: false,
    };
    return transformedObject;
  }
}
