import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'

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

export const getUserStatusSuccess = (): Action => {
  return {
    type: actionTypes.GET_USER_STATUS_SUCCESS
  }
}

export const getUserStatusFailure = (): Action => {
  return {
    type: actionTypes.GET_USER_STATUS_FAILURE
  }
}

export const getUserStatus = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getUserStatusRequest())
    try {
      if(ready()) {
        await axios.get('/api/user', { headers: loginHeaders() })
        dispatch(getUserStatusSuccess())
      } else {
        dispatch(getUserStatusFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
