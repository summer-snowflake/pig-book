import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:' + SERVER_PORT;

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
};

export const loginSuccess = (data, headers) => {
  document.cookie = `uid=${headers['uid']};`
  document.cookie = `client=${headers['client']};`
  document.cookie = `access-token=${headers['access-token']};`
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data
  }
};

export const loginFailure = (err) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    err
  }
};

export const login = (params) => {
  return async (dispatch) => {
    dispatch(loginRequest())
    try {
      const res = await axios.post('/api/auth/sign_in', params);
      return dispatch(loginSuccess(res.data, res.headers));
    }
    catch(err) {
      return dispatch(loginFailure(err));
    }
  }
}

export const logout = () => {
  document.cookie = `client=;path=/users`
  document.cookie = `access-token=;path=/users`
  document.cookie = `uid=;path=/users`
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}
