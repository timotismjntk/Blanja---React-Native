const initialState = {
  isError: false,
  alertMsg: '',
  isLoading: true,
  data: [],
  delivery: 0,
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHECKOUT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_CHECKOUT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'GET_CHECKOUT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        delivery: action.payload.data.delivery,
        totalPrice: action.payload.data.totalPrice,
        totalQuantity: action.payload.data.totalQuantity,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isError: false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
