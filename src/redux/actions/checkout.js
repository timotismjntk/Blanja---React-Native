import http from '../../helpers/http';

export default {
  getCheckout: (token) => {
    return {
      type: 'GET_CHECKOUT',
      payload: http(token).get('user/cart/checkout'),
    };
  },
};
