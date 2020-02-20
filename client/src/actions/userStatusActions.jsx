import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:' + SERVER_PORT;

export const getUserStatusRequest = () => {
  return {
    type: actionTypes.GET_USER_STATUS_REQUEST
  }
}

export const getUserStatusSuccess = () => {
  return {
    type: actionTypes.GET_USER_STATUS_SUCCESS
  }
}

export const getUserStatusFailure = () => {
  return {
    type: actionTypes.GET_USER_STATUS_FAILURE
  }
}

export const getUserStatus = () => {
  return async (dispatch) => {
    dispatch(getUserStatusRequest());
    const cookies = document.cookie.split(';').map((f) => f.split('=').map((s) => s.trim()));
    const headers = {}
    cookies.forEach((c) => {
      headers[c[0]] = c[1]
    })
    const ready = ['client', 'uid', 'access-token'].every((key) => {
      return Object.keys(headers).includes(key)
    })

    try {
      if(ready) {
        const res = await axios.get('/api/user', { headers: headers });
        dispatch(getUserStatusSuccess(res));
      } else {
        dispatch(getUserStatusFailure());
      }
    }
    catch(err) {
      console.log(err);
    }
  }
}

