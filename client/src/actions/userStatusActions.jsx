import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

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
    try {
      if(ready()) {
        const res = await axios.get('/api/user', { headers: loginHeaders() });
        dispatch(getUserStatusSuccess(res));
      } else {
        dispatch(getUserStatusFailure());
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}
