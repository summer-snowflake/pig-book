import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { UsersAction } from 'types/action'
import { User } from 'types/api'

const getUsersRequest = (): Action => {
  return {
    type: actionTypes.GET_USERS_REQUEST
  }
}

const getUsersSuccess = (users: User[], max_page: number, page: number): UsersAction => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users,
    page,
    max_page
  }
}

const getUsersFailure = (): Action => {
  return {
    type: actionTypes.GET_USERS_FAILURE
  }
}

export const getUsers = (params: { page: number }) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getUsersRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/admin/users', { params: params, headers: loginHeaders() })
        dispatch(getUsersSuccess(res.data.list, res.data.max_page, params.page))
      } else {
        dispatch(getUsersFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
