/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getNewProduct: () => {
    return {
      type: 'GET_NEW_PRODUCT',
      payload: http().get('public/product/new'),
    };
  },
};
