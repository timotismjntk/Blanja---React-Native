import http from '../../helpers/http';
import qs from 'query-string';

export default {
  readOrders: (token) => {
    return {
      type: 'READ_ORDERS',
      payload: http(token).get('order'),
    };
  },
  readDetailOrders: (token, id) => {
    return {
      type: 'READ_DETAIL_ORDERS',
      payload: http(token).get(`order/detail/${id}`),
    };
  },
  createOrdersAndTransactions: (token, data) => {
    return {
      type: 'CREATE_ORDER_TRANSACTION',
      payload: http(token).post('order/auto', qs.stringify(data)),
    };
  },
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE_ORDER',
  }),
};
