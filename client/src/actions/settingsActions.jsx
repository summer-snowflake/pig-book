import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

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
    try {
      if(ready()) {
        const res = await axios.get('/api/profile', { headers: loginHeaders() });
        dispatch(getSettingsSuccess(res));
      } else {
        dispatch(getSettingsFailure());
      }
    }
    catch (err) {
      console.error(err);
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
