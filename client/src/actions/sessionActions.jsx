import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
};