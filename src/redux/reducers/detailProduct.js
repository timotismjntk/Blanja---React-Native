/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
  price: '',
  isTrue: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DETAIL_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_PRODUCT_FULFILLED': {
      console.log(action);
      console.log(action.payload.data.data[0].price);
      var nilai = '';
      let hasil = '';
      let result = action.payload.data.data[0].price
        .toString()
        .split('')
        .reverse()
        .join('');
      for (let i = 0; i < result.length; i++) {
        if (i % 3 === 0) {
          nilai += result.substr(i, 3) + '.';
        }
      }
      hasil = nilai
        .split('', nilai.length - 1)
        .reverse()
        .join('');
      return {
        ...state,
        isTrue: true,
        isLoading: false,
        data: action.payload.data.data[0],
        price: hasil,
      };
    }
    default: {
      return state;
    }
  }
};
