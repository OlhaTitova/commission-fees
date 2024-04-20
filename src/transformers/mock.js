// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_OPERATIONS = [
  {
    date: '2016-01-05',
    userId: 1,
    userType: 'natural',
    type: 'cash_in',
    operation: { amount: 200, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-06',
    userId: 2,
    userType: 'juridical',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-06',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-07',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-07',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-10',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 100, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-10',
    userId: 2,
    userType: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-01-10',
    userId: 3,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 1000, currency: 'EUR' },
    process: false,
  },
  {
    date: '2016-02-15',
    userId: 1,
    userType: 'natural',
    type: 'cash_out',
    operation: { amount: 300, currency: 'EUR' },
    process: false,
  },
];