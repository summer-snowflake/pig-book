import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

export const getSettingsRequest = () => {
  return {
    type: actionTypes.GET_PROFILE_REQUEST
  }
}

export const getSettingsSuccess = (data) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    data
  }
}

export const getSettingsFailure = () => {
  return {
    type: actionTypes.GET_PROFILE_FAILURE
  }
}

export const getSettings = () => {
  return async (dispatch) => {
    dispatch(getSettingsRequest());
    try {
      if(ready()) {
        const res = await axios.get('/api/profile', { headers: loginHeaders() });
        dispatch(getSettingsSuccess(res.data));
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
    type: actionTypes.CHANGE_PROFILE_LOCALE,
    locale: locale
  }
}

export const changeSettingsCurrency = (currency) => {
  return {
    type: actionTypes.CHANGE_PROFILE_CURRENCY,
    currency: currency
  }
}

export const patchSettingsRequest = () => {
  return {
    type: actionTypes.PATCH_PROFILE_REQUEST
  }
}

export const patchSettingsSuccess = (data) => {
  return {
    type: actionTypes.PATCH_PROFILE_SUCCESS,
    data
  }
}

export const patchSettingsFailure = () => {
  return {
    type: actionTypes.PATCH_PROFILE_FAILURE
  }
}

export const patchSettings = (params) => {
  return async (dispatch) => {
    dispatch(patchSettingsRequest());
    try {
      if(ready()) {
        const res = await axios.patch('/api/profile', params, { headers: loginHeaders() });
        dispatch(patchSettingsSuccess(res.data));
      } else {
        dispatch(getSettingsFailure());
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const setEditing = (editing) => {
  return {
    type: actionTypes.SET_EDITING,
    editing
  }
}
