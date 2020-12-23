const initialState = {
  data: [],
  order: [],
  isLoading: false,
  isError: false,
  alertMsg: '',
  isCreated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'READ_ORDERS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'READ_ORDERS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'READ_ORDERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
      };
    }
    case 'READ_DETAIL_ORDERS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'READ_DETAIL_ORDERS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'READ_DETAIL_ORDERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        order: action.payload.data.results,
      };
    }
    case 'CREATE_ORDER_TRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CREATE_ORDER_TRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'CREATE_ORDER_TRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        isCreated: true,
        isError: false,
      };
    }
    case 'CLEAR_MESSAGE_ORDER': {
      return {
        ...state,
        isLoading: false,
        alertMsg: '',
        isCreated: false,
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
