import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

const getProfileRequest = () => {
  return {
    type: actionTypes.GET_PROFILE_REQUEST
  }
}

const getProfileSuccess = (data) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    data
  }
}

const getProfileFailure = () => {
  return {
    type: actionTypes.GET_PROFILE_FAILURE
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    dispatch(getProfileRequest());
    try {
      if(ready()) {
        const res = await axios.get('/api/profile', { headers: loginHeaders() });
        dispatch(getProfileSuccess(res.data));
      } else {
        dispatch(getProfileFailure());
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const changeProfileLocale = (locale) => {
  return {
    type: actionTypes.CHANGE_PROFILE_LOCALE,
    locale: locale
  }
}

export const changeProfileCurrency = (currency) => {
  return {
    type: actionTypes.CHANGE_PROFILE_CURRENCY,
    currency: currency
  }
}

const patchProfileRequest = () => {
  return {
    type: actionTypes.PATCH_PROFILE_REQUEST
  }
}

const patchProfileSuccess = (data) => {
  return {
    type: actionTypes.PATCH_PROFILE_SUCCESS,
    data
  }
}

const patchProfileFailure = () => {
  return {
    type: actionTypes.PATCH_PROFILE_FAILURE
  }
}

export const patchProfile = (params) => {
  return async (dispatch) => {
    dispatch(patchProfileRequest());
    try {
      if(ready()) {
        const res = await axios.patch('/api/profile', params, { headers: loginHeaders() });
        dispatch(patchProfileSuccess(res.data));
      } else {
        dispatch(patchProfileFailure());
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
