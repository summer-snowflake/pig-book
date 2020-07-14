import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { User, UserParams } from 'types/api'
import { UserAction, ErrorsAction } from 'types/action'
import { catchErrors } from 'actions/errorsAction'

export const getCookiesFailure = (): Action => {
  return {
    type: actionTypes.GET_COOKIES_FAILURE
  }
}

export const getUserStatusRequest = (): Action => {
  return {
    type: actionTypes.GET_USER_STATUS_REQUEST
  }
}

export const getUserStatusSuccess = (user: User): UserAction => {
  return {
    type: actionTypes.GET_USER_STATUS_SUCCESS,
    user
  }
}

export const getUserStatus = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getUserStatusRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/user', { headers: loginHeaders() })
        dispatch(getUserStatusSuccess(res.data))
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

const patchUserRequest = (): Action => {
  return {
    type: actionTypes.PATCH_USER_REQUEST
  }
}

const patchUserSuccess = (user: User): UserAction => {
  return {
    type: actionTypes.PATCH_USER_SUCCESS,
    user
  }
}

const patchUserFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_USER_FAILURE,
    errors
  }
}

export const patchUser = (params: UserParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchUserRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/user', params, { headers: loginHeaders() })
        dispatch(patchUserSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchUserFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
