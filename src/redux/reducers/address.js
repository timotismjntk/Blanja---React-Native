/* eslint-disable prettier/prettier */
const initialState = {
  data: [],
  address: [],
  detail: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
  isSelect: false,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        address: action.payload.data.results,
      };
    }
    case 'SELECT_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SELECT_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSelect: false,
        alertMsg: action.payload.data.error,
      };
    }
    case 'SELECT_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSelect: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'GET_PRIMARY_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PRIMARY_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_PRIMARY_ADDRESS_FULFILLED': {
      // console.log(action.payload.data.results[0].total_rating)
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data[0],
      };
    }
    case 'DETAIL_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'DETAIL_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'DETAIL_ADDRESS_FULFILLED': {
      // console.log(action.payload.data.results[0].total_rating)
      return {
        ...state,
        isLoading: false,
        detail: action.payload.data.results,
      };
    }
    case 'POST_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        isSuccess: true,
        isError: false,
      };
    }
    case 'PATCH_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PATCH_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'PATCH_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        isSuccess: true,
        isError: false,
      };
    }
    case 'REMOVING_MESSAGE_ADDRESS': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        alertMsg: '',
        isSelect: false,
      };
    }
    default: {
      return state;
    }
  }
};
