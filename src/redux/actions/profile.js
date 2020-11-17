/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'query-string';

export default {
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('profile'),
    };
  },
  getProfileHistory: (token) => {
    return {
      type: 'GET_PROFILE_HISTORY',
      payload: http(token).get('profile/history'),
    };
  },
  updateProfile: (token, data) => {
    return {
      type: 'PATCH_PROFILE',
      payload: http(token).patch('manage/users', qs.stringify(data)),
    };
  },
  uploadProfileImage: (token, data) => {
    return {
      type: 'PATCH_PROFILE_IMAGE',
      payload: http(token).patch('manage/users', data),
    };
  },
  removeMessage: () => {
    return {
      type: 'REMOVE_MESSAGE',
    };
  },
};
