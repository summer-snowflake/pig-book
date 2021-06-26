import { Dispatch } from 'react'
import { Action } from 'redux'
import * as H from 'history'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { setCookies, clearCookies, loginHeaders } from 'utils/cookies'
import { User, LoginParams, Errors } from 'types/api'
import { CookiesHeader } from 'types/store'
import { ErrorsAction, UserAction } from 'types/action'

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

export const loginFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    errors
  }
}

export const login = (params: LoginParams, history: H.History) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(loginRequest())
    try {
      const res = await axios.post('/api/auth/sign_in', params)
      dispatch(loginSuccess(res.data, res.headers))
      history.push('/mypage')
    }
    catch(err) {
      return dispatch(loginFailure(err.response.data.errors))
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

export const signOut = (history: H.History) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(signOutRequest())
    try {
      await axios.delete('/api/auth/sign_out', { headers: loginHeaders() })
      dispatch(signOutSuccess())
      history.push('/users/sign_in')
    }
    catch(err) {
      return dispatch(signOutFailure())
    }
  }
}
