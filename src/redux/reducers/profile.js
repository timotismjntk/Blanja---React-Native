/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
//   info: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
  updated: false,
  isUploaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.userId[0],
      };
    }
    case 'PATCH_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PATCH_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'PATCH_PROFILE_FULFILLED': {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Profile updated',
        updated: true,
      };
    }
    case 'PATCH_PROFILE_IMAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PATCH_PROFILE_IMAGE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'PATCH_PROFILE_IMAGE_FULFILLED': {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        alertMsg: 'Image updated',
        isUploaded: true,
      };
    }
    case 'REMOVE_MESSAGE': {
      return {
        ...state,
        isLoading: false,
        updated: false,
        alertMsg: '',
        isUploaded: false,
      };
    }
    default: {
      return state;
    }
  }
};
