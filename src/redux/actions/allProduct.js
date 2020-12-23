/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  getProduct: (data = '', orderByKey = 'created_at', orderByValue = 'DESC', page = 1) => {
    return {
      type: 'GET_PRODUCT',
      payload: http().get(`public?search=${data}&orderBy[${orderByKey}]=${orderByValue}&page=${page}`),
    };
  },
  getProductByCategory: (search = '', orderByKey = 'created_at', orderByValue = 'DESC', page = 1)=>{
    return {
      type: 'GET_PRODUCT_BY_CATEGORY',
      payload: http().get(`public?search[category.category_name]=${search}&orderBy[${orderByKey}]=${orderByValue}&page=${page}`),
    };
  },
};
