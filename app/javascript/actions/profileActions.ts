import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { Profile, ProfileParams } from 'types/api'
import { ProfileAction } from 'types/action'
import { getCookiesFailure } from 'actions/userActions'
import { catchErrors } from 'actions/errorsActions'

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

const patchProfileRequest = (): Action => {
  return {
    type: actionTypes.PATCH_PROFILE_REQUEST
  }
}

const patchProfileSuccess = (profile: Profile): ProfileAction => {
  return {
    type: actionTypes.PATCH_PROFILE_SUCCESS,
    profile
  }
}

export const patchProfile = (params: ProfileParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchProfileRequest())
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