import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:' + SERVER_PORT;

export const setFlashMessageStyleClass = () => {
  return {
    type: actionTypes.SET_FLASH_MESSAGE_STYLE_CLASS
  }
}
