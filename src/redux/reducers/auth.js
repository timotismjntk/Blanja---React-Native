const initialState = {
  isLogin: false,
  isSignup: false,
  failSignup: false,
  isError: false,
  isLoading: false,
  token: '',
  alertMsg: '',
  isMatch: false,
  resetCodeData: {},
  isVerify: false,
  isErrorVerify: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login',
      };
    }
    case 'SIGNUP_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGNUP_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        failSignup: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'SIGNUP_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSignup: true,
        failSignup: false,
        alertMsg: 'Signup Successfully',
      };
    }
    case 'GET_RESET_CODE_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: '',
      };
    }
    case 'GET_RESET_CODE_REJECTED': {
      return {
        ...state,
        isMatch: false,
        isLoading: false,
        isErrorResetCode: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isMatch: true,
        isLoading: false,
        isErrorResetCode: false,
        resetCodeData: action.payload.data.result,
      };
    }
    case 'VERIFY_RESET_CODE_PENDING': {
      return {
        ...state,
        isVerify: false,
        isErrorVerify: false,
      };
    }
    case 'VERIFY_RESET_CODE_REJECTED': {
      return {
        ...state,
        isVerify: false,
        isErrorVerify: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'VERIFY_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isVerify: true,
        isErrorVerify: false,
        resetCodeData: action.payload.data.result,
      };
    }
    case 'persist/REHYDRATED': {
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      };
    }
    case 'LOGOUT_USER': {
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: 'Logout Successfully',
      };
    }
    case 'REMOVING_MESSAGE': {
      return {
        ...state,
        isSignup: false,
        failSignup: false,
        isError: false,
        isLoading: false,
        alertMsg: '',
        isMatch: false,
        resetCodeData: {},
        isVerify: false,
        isErrorVerify: false,
      };
    }
    case 'CLEAR_MESSAGE_AUTH': {
      return {
        ...state,
        isSignup: false,
        failSignup: false,
        isError: false,
        isLoading: false,
        alertMsg: '',
        isMatch: false,
        isVerify: false,
        isErrorVerify: false,
      };
    }
    default: {
      return state;
    }
  }
};
