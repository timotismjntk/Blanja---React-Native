const initialState = {
  data: [],
  isLoading: false,
  pageInfo: {},
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_PRODUCT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_PRODUCT_BY_CATEGORY_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PRODUCT_BY_CATEGORY_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_PRODUCT_BY_CATEGORY_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
