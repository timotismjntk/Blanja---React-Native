/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getPopularProduct: () => {
    return {
      type: 'GET_POPULAR_PRODUCT',
      payload: http().get('public/product/popular'),
    };
  },
};
