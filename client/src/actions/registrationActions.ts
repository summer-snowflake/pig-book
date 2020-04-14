import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { SignUpParams } from 'types/api'
import { ErrorsAction } from 'types/action'

export const signUpRequest = (): Action => {
  return {
    type: actionTypes.SIGN_UP_REQUEST
  }
}

export const signUpSuccess = (): Action => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS
  }
}

export const signUpFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    errors
  }
}

export const signUp = (params: SignUpParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(signUpRequest())
    try {
      await axios.post('/api/auth', params)
      dispatch(signUpSuccess())
    }
    catch(err) {
      if (err.response.status === 422) {
        dispatch(signUpFailure(err.response.data.errors.full_messages))
      }
      console.error(err)
    }
  }
}

export const reloadSignUp = (): Action => {
  return {
    type: actionTypes.RELOAD_SIGN_UP,
  }
}
