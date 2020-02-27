import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';

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

export const loginFailure = (data) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    data
  }
};

export const login = (params, history) => {
  return async (dispatch) => {
    dispatch(loginRequest())
    try {
      const res = await axios.post('/api/auth/sign_in', params);
      history.push('/mypage');
      return dispatch(loginSuccess(res.data, res.headers));
    }
    catch(err) {
      return dispatch(loginFailure(err.response?.data));
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
