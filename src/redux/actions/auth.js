import http from '../../helpers/http';
import qs from 'query-string';

export default {
  signUp: (data) => ({
    type: 'SIGNUP_USER',
    payload: http().post('auth/signup/', qs.stringify(data)),
  }),
  login: (email, password) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login/', {email, password}),
  }),
  getResetCode: (email) => ({
    type: 'GET_RESET_CODE',
    payload: http().post('auth/reset', {email: email}),
  }),
  verifyResetCode: (email, reset_code) => ({
    type: 'VERIFY_RESET_CODE',
    payload: http().post(
      'auth/verify/reset',
      qs.stringify({email, reset_code}),
    ),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE_AUTH',
  }),
  removeMessage: () => ({
    type: 'REMOVING_MESSAGE',
  }),
  setToken: (payload) => ({
    type: 'persist/REHYDRATED',
    payload,
  }),
};
