/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
// import { createAsyncAction } from 'redux-promise-middleware-actions';
// import qs from 'querystring';

export default {
  getAddress: async (token) => {
      try {
        await {
            type: 'GET_ADDRESS',
            payload: http(token).get('users/address/'),
          };
      } catch (e) {

      }
  },
  getPrimaryAddress: (token, id) => {
    return {
      type: 'GET_PRIMARY_ADDRESS',
      payload: http(token).get(`users/address/${id}`),
    };
  },
  createAddress: (token, data) => {
    return {
      type: 'POST_ADDRESS',
    //   payload: http(token).post('users/address', qs.stringify(data)),
    };
  },
  deleteAddress: (token, id) => {
    // alert(qs.stringify(id))
    return {
      type: 'DELETE_ADDRESS',
      payload: http(token).delete(`users/address/${id}`),
    };
  },
  patchAddress: (token, data, product_id) => {
    return {
      type: 'PATCH_ADDRESS',
    //   payload: http(token).put('user/address/', qs.stringify(data), {
    //     product_id,
    //   }),
    };
  },
};
