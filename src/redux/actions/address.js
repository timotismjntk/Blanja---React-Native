import http from '../../helpers/http';
import qs from 'query-string';

export default {
  getAddress: (token) => {
    return {
      type: 'GET_ADDRESS',
      payload: http(token).get('users/address/'),
    };
  },
  getPrimaryAddress: (token, id) => {
    return {
      type: 'GET_PRIMARY_ADDRESS',
      payload: http(token).get(`users/address/${id}`),
    };
  },
  selectAddress: (token, id) => {
    return {
      type: 'SELECT_ADDRESS',
      payload: http(token).get(`users/address/choose/primary/${id}`),
    };
  },
  getDetailAddress: (token, id) => {
    return {
      type: 'DETAIL_ADDRESS',
      payload: http(token).get(`users/address/get/${id}`),
    };
  },
  createAddress: (token, data) => {
    return {
      type: 'POST_ADDRESS',
      payload: http(token).post('users/address', qs.stringify(data)),
    };
  },
  deleteAddress: (token, id) => {
    // alert(qs.stringify(id))
    return {
      type: 'DELETE_ADDRESS',
      payload: http(token).delete(`users/address/${id}`),
    };
  },
  patchAddress: (token, data, id) => {
    return {
      type: 'PATCH_ADDRESS',
      payload: http(token).patch(`users/address/${id}`, qs.stringify(data)),
    };
  },
  removeMessage: () => ({
    type: 'REMOVING_MESSAGE_ADDRESS',
  }),
};
