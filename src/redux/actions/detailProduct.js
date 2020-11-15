/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getDetailProducts: (id) => {
    return {
      type: 'GET_DETAIL_PRODUCT',
      payload: http().get(`public/product/${id}`),
    };
  },
};
