/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
// import qs from 'querystring';


export default {
  login: (email, password) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login/', {email, password}),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
  setToken: (payload) => ({
    type: 'persist/REHYDRATED',
    payload,
  }),
};
