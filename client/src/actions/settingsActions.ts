import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { Profile, ProfileParams } from 'types/api'
import { ProfileAction } from 'types/action'
import { getCookiesFailure } from 'actions/userStatusActions'
import { catchErrors } from 'actions/errorsAction'

interface WithLocaleAction extends Action {
  locale: string;
}

interface WithCurrencyAction extends Action {
  currency: string;
}

interface WithEditingAction extends Action {
  editing: boolean;
}

interface WithEditingMemoAction extends Action {
  editingMemo: boolean;
}

interface WithTargetAction extends Action {
  target: string;
}

const getProfileRequest = (): Action => {
  return {
    type: actionTypes.GET_PROFILE_REQUEST
  }
}

const getProfileSuccess = (profile: Profile): ProfileAction => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile
  }
}

export const getProfile = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getProfileRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/profile', { headers: loginHeaders() })
        dispatch(getProfileSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

export const changeProfileLocale = (locale: string): WithLocaleAction => {
  return {
    type: actionTypes.CHANGE_PROFILE_LOCALE,
    locale: locale
  }
}

export const changeProfileCurrency = (currency: string): WithCurrencyAction => {
  return {
    type: actionTypes.CHANGE_PROFILE_CURRENCY,
    currency: currency
  }
}

const patchProfileRequest = (target: string): WithTargetAction => {
  return {
    type: actionTypes.PATCH_PROFILE_REQUEST,
    target
  }
}

const patchProfileSuccess = (profile: Profile): ProfileAction => {
  return {
    type: actionTypes.PATCH_PROFILE_SUCCESS,
    profile
  }
}

export const patchProfile = (params: ProfileParams, target: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchProfileRequest(target))
    try {
      if(ready()) {
        const res = await axios.patch('/api/profile', params, { headers: loginHeaders() })
        dispatch(patchProfileSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

export const setEditing = (editing: boolean): WithEditingAction => {
  return {
    type: actionTypes.SET_EDITING,
    editing
  }
}

export const setEditingMemo = (editingMemo: boolean): WithEditingMemoAction => {
  return {
    type: actionTypes.SET_EDITING_MEMO,
    editingMemo
  }
}
