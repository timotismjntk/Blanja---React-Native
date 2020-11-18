/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getProduct: (data = '') => {
    return {
      type: 'GET_PRODUCT',
      payload: http().get(`public/product/new?search=${data}`),
    };
  },
};
