import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { setCookies, clearCookies } from 'utils/cookies';

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
};

export const loginSuccess = (data, headers) => {
  setCookies(headers);
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
  clearCookies();
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}
