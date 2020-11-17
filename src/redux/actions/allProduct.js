/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getProduct: () => {
    return {
      type: 'GET_PRODUCT',
      payload: http().get('public/'),
    };
  },
};
