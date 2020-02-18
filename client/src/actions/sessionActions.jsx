import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
};

export const login = () => {
  return async (dispatch) => {
    dispatch(loginRequest())
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.baseURL = 'http://localhost:3001';
    try {
      const res = await axios.post('/api/v2/auth/sign_in');
      console.log('abc');
    }
    catch(err) {
      console.log(err);
      console.log('error');
    }
  }
}
