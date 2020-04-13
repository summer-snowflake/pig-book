import { Dispatch } from 'react'
import { Action } from 'redux'
import * as H from 'history'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { setCookies, clearCookies } from 'utils/cookies'
import { User, LoginParams, SignUpParams } from 'types/api'
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

export const login = (params: LoginParams, history: H.History) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(loginRequest())
    try {
      const res = await axios.post('/api/auth/sign_in', params)
      history.push('/mypage')
      return dispatch(loginSuccess(res.data, res.headers))
    }
    catch(err) {
      return dispatch(loginFailure())
    }
  }
}

export const logout = (): Action => {
  clearCookies()
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}

export const signUpRequest = (): Action => {
  return {
    type: actionTypes.SIGN_UP_REQUEST
  }
}

export const signUpSuccess = (user: User, headers: CookiesHeader): UserAction => {
  setCookies(headers)
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    user
  }
}

export const signUpFailure = (): Action => {
  return {
    type: actionTypes.SIGN_UP_FAILURE
  }
}

export const signUp = (params: SignUpParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(signUpRequest())
    try {
      const res = await axios.post('/api/auth', params)
      console.log(res)
      return dispatch(signUpSuccess(res.data, res.headers))
    }
    catch(err) {
      return dispatch(signUpFailure())
    }
  }
}
