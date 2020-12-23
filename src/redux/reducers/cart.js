/* eslint-disable prettier/prettier */
const initialState = {
  isError: false,
  alertMsg: '',
  isLoading: true,
  data: [],
  quantity: 1,
  totalSummary: 0,
  quantityCartFromDB: 0,
  isSelected: false,
  isDelete: false,
  isAdded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
        totalSummary: 0,
        isDelete: false,
        data:[],
      };
    }
    case 'GET_CART_FULFILLED': {
      // console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
        totalSummary: action.payload.data.totalSummary,
      };
    }
    case 'POST_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_CART_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        // data:[],
        isAdded: true,
        quantity: 1,
      };
    }
    case 'PATCH_QTY_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PATCH_QTY_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'PATCH_QTY_CART_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        quantityCartFromDB: 'tes',
      };
    }

    case 'DELETE_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'DELETE_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'DELETE_CART_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        quantityCartFromDB: 'tes',
        isDelete: true,
      };
    }
    case 'SELECT_CART': {
      return {
        ...state,
        isSelected: true,
      };
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    }
    case 'CLEAR_MESSAGE_CART': {
      return {
        ...state,
        // isError: false,
        isAdded: false,
        alertMsg: '',
        isDelete: false,
      };
    }
    default: {
      return state;
    }
  }
};
