import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { setCookies, clearCookies, loginHeaders } from 'utils/cookies'
import { User, LoginParams } from 'types/api'
import { CookiesHeader } from 'types/store'
import { UserAction } from 'types/action'

export const loginRequest = (): Action => {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
}

export const loginSuccess = (user: User, headers: CookiesHeader): UserAction => {
  setCookies(headers)
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user
  }
}

export const loginFailure = (): Action => {
  return {
    type: actionTypes.LOGIN_FAILURE
  }
}

export const login = (params: LoginParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(loginRequest())
    try {
      const res = await axios.post('/api/auth/sign_in', params)
      dispatch(loginSuccess(res.data, res.headers))
      window.location.href = '/mypage'
    }
    catch(err) {
      return dispatch(loginFailure())
    }
  }
}

const signOutRequest = (): Action => {
  return {
    type: actionTypes.LOGOUT_REQUEST
  }
}

const signOutSuccess = (): Action => {
  clearCookies()
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}

const signOutFailure = (): Action => {
  return {
    type: actionTypes.LOGIN_FAILURE
  }
}

export const signOut = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(signOutRequest())
    try {
      await axios.delete('/api/auth/sign_out', { headers: loginHeaders() })
      dispatch(signOutSuccess())
      window.location.href = '/users/sign_in'
    }
    catch(err) {
      return dispatch(signOutFailure())
    }
  }
}

