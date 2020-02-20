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

export const getUserStatus = () => {
  return async (dispatch) => {
    dispatch(getUserStatusRequest());
    console.log(document.cookie.split(';'))
  }
}

