export const ENVIROMENT = {
  USER_STORAGE: 'USER', // name of user save in localStorage
  API_URL: 'http://localhost:5021/api',
  // API_URL: 'https://localhost:7043/api',
  IMG_URL: 'http://localhost:5021/images',
  END_POINT: {
    AUTH: {
      LOGIN: '/account/login/',
      REGISTER: '/account/register/',
      EDIT: '/account/edit/',
    },
    TRANSACTION: {
      GET_TRANSACTIONS: '/Transaction/getTransactions',
      FILTER_TIME_TRANSACTIONS: '/Transaction/findTransactionTime',
      TRANSACTION_ACTION: '/Transaction/transaction',
    },
  },
};
