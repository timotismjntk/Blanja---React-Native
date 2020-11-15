/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
  address: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
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
      // console.log(action.payload.data.results[0].total_rating)
      return {
        ...state,
        isLoading: false,
        address: action.payload.data.results,
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
    case 'POST_ADDRESS_PENDING': {
      return {
        ...state,
        isLoading: true,
        info: {},
      };
    }
    case 'POST_ADDRESS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        info: {},
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        // info:{},
        isAdded: true,
        quantity: 1,
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
      };
    }
    case 'PATCH_ADDRESS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Success',
        quantityADDRESSFromDB: 'tes',
      };
    }
    default: {
      return state;
    }
  }
};
