export const DEFAULT_OPERATIONS_JSON = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 3,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
  },
];

export const DEFAULT_OPERATIONS_TRANSFORMED = [
  {
    date: '2016-01-05',
    userId: 1,
    userType: 'natural',
    type: 'cash_in',
    operation: { amount: 200, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-06',
    userId: 2,
    userType: 'juridical',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-06',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-07',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-07',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-10',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-10',
    userId: 2,
    userType: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-01-10',
    userId: 3,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
    processed: false,
  },
  {
    date: '2016-02-15',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
    processed: false,
  },
];

export const CASH_IN_CONFIG = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
};

export const CASH_OUT_JURIDICAL_CONFIG = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR',
  },
};
export const CASH_OUT_NATURAL_CONFIG = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
};
