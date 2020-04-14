import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { setCookies } from 'utils/cookies'
import { User, SignUpParams } from 'types/api'
import { CookiesHeader } from 'types/store'
import { UserAction } from 'types/action'

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
