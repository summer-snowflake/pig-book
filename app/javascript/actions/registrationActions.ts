import { Dispatch } from 'react'
import { Action } from 'redux'
import * as H from 'history'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { SignUpParams } from 'types/api'
import { ErrorsAction } from 'types/action'
import { catchErrors } from 'actions/errorsActions'

const signUpRequest = (): Action => {
  return {
    type: actionTypes.SIGN_UP_REQUEST
  }
}

const signUpSuccess = (): Action => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS
  }
}

const signUpFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    errors
  }
}

export const signUp = (params: SignUpParams, history: H.History) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(signUpRequest())
    try {
      await axios.post('/api/auth', params)
      dispatch(signUpSuccess())
      history.push('/users/sign_in')
    }
    catch(err) {
      if (err.response.status === 422) {
        dispatch(signUpFailure(err.response.data.errors.full_messages))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

export const reloadSignUp = (): Action => {
  return {
    type: actionTypes.RELOAD_SIGN_UP,
  }
}

const confirmUserRequest = (): Action => {
  return {
    type: actionTypes.CONFIRM_USER_REQUEST
  }
}

const confirmUserSuccess = (): Action => {
  return {
    type: actionTypes.CONFIRM_USER_SUCCESS
  }
}

const confirmUserFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.CONFIRM_USER_FAILURE,
    errors
  }
}

export const confirmUser = (confirmationToken: string, history: H.History) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(confirmUserRequest())
    try {
      await axios.get('/api/auth/confirmation?confirmation_token=' + confirmationToken)
      history.push('/users/sign_in')
      dispatch(confirmUserSuccess())
    }
    catch(err) {
      dispatch(confirmUserFailure(err.response?.data?.errors || []))
    }
  }
}

export const clearErrors = (): Action => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  }
}
