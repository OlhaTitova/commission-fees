import { isEmpty } from 'lodash-es';

class OperationsTransformer {
  constructor(operation = {}) {
    this.operation = operation;
  }

  transform() {
    if (isEmpty(this.operation)) {
      return {};
    }
    const transformedObject = {
      date: this.operation.date,
      userId: this.operation.user_id,
      userType: this.operation.user_type,
      type: this.operation.type,
      operation: {
        amount: this.operation.operation.amount,
        currency: this.operation.operation.currency,
      },
      process: false,
    };
    return transformedObject;
  }
}

export default OperationsTransformer;
