import axios from 'axios';
import * as actionTypes from 'utils/actionTypes';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:' + SERVER_PORT;

export const getSettingsRequest = () => {
  return {
    type: actionTypes.GET_SETTINGS_REQUEST
  }
}

export const getSettingsSuccess = () => {
  return {
    type: actionTypes.GET_SETTINGS_SUCCESS
  }
}

export const getSettingsFailure = () => {
  return {
    type: actionTypes.GET_SETTINGS_FAILURE
  }
}

export const getSettings = () => {
  return async (dispatch) => {
    dispatch(getSettingsRequest());
    const cookies = document.cookie.split(';').map((f) => f.split('=').map((s) => s.trim()));
    const cookieObjects = {}
    const headers = {}
    cookies.forEach((c) => {
      cookieObjects[c[0]] = c[1]
    });
    ['client', 'uid', 'access-token'].forEach((c) => {
      headers[c] = cookieObjects[c]
    });
    const ready = ['client', 'uid', 'access-token'].every((key) => {
      return Object.keys(headers).includes(key)
    })

    try {
      if(ready) {
        const res = await axios.get('/api/profile', { headers: headers });
        dispatch(getSettingsSuccess(res));
      } else {
        dispatch(getSettingsFailure());
      }
    }
    catch {
      dispatch(getSettingsFailure());
    }
  }
}

export const changeSettingsLocale = (locale) => {
  return {
    type: actionTypes.CHANGE_SETTINGS_LOCALE,
    locale: locale
  }
}

export const changeSettingsCurrency = (currency) => {
  return {
    type: actionTypes.CHANGE_SETTINGS_CURRENCY,
    currency: currency
  }
}
