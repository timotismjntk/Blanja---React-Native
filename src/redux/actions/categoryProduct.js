/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getCatProduct: () => {
    return {
      type: 'GET_CATEGORY_PRODUCT',
      payload: http().get('public/product/category'),
    };
  },
};
