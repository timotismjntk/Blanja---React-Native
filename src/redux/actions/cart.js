/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'query-string';

export default {
  getCart: (token) => {
    return {
      type: 'GET_CART',
      payload: http(token).get('user/cart'),
    };
  },
  createCart: (token, data) => {
    return {
      type: 'POST_CART',
      payload: http(token).post('user/cart', data),
    };
  },
  deleteCart: (token, id) => {
    // alert(qs.stringify(id))
    return {
      type: 'DELETE_CART',
      payload: http(token).delete(`user/cart/${id}`),
    };
  },
  selectCart: () => {
    return {
      type: 'SELECT_CART',
    };
  },
  patchQuantityCart: (token, data, product_id) => {
    console.log(qs.stringify(data));
    return {
      type: 'PATCH_QTY_CART',
      payload: http(token).put('user/cart/', qs.stringify(data), {product_id}),
    };
  },
  // patchDecreaseQuantityCart: (token, id, data)=> {
  //   return {
  //     type: 'PATCH_DECREASE_QTY_CART',
  //     payload: http(token).patch(`user/cart/${id}`, data),
  //   };
  // },
  increaseQuantityBeforeAddCart: () => ({
    type: 'INCREASE_QUANTITY',
  }),
  decreaseQuantityBeforeAddCart: () => ({
    type: 'DECREASE_QUANTITY',
  }),
};
