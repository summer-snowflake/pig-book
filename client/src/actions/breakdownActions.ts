import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction } from 'types/action'
import { BreakdownParams, Errors, Category } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'

interface WithNameAction extends Action {
  name: string;
}

interface WithCategoryAction extends Action {
  category: Category | undefined;
}

const postBreakdownRequest = (): Action => {
  return {
    type: actionTypes.POST_BREAKDOWN_REQUEST
  }
}

const postBreakdownSuccess = (): Action => {
  return {
    type: actionTypes.POST_BREAKDOWN_SUCCESS
  }
}

const postBreakdownFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_BREAKDOWN_FAILURE,
    errors
  }
}

export const postBreakdown = (params: BreakdownParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postBreakdownRequest())
    try {
      if(ready()) {
        await axios.post('/api/breakdowns', params, { headers: loginHeaders() })
        dispatch(postBreakdownSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(postBreakdownFailure(err.response.data.errors))
      }
      console.error(err)
    }
  }
}

export const changeBreakdownName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_BREAKDOWN_NAME,
    name
  }
}

export const changeCategory = (category: Category | undefined): WithCategoryAction => {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    category
  }
}

const patchBreakdownRequest = (): Action => {
  return {
    type: actionTypes.PATCH_BREAKDOWN_REQUEST
  }
}

const patchBreakdownSuccess = (): Action => {
  return {
    type: actionTypes.PATCH_BREAKDOWN_SUCCESS
  }
}

const patchBreakdownFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_BREAKDOWN_FAILURE,
    errors
  }
}

export const patchBreakdown = (id: number, params: BreakdownParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchBreakdownRequest())

    try {
      if(ready()) {
        await axios.patch('/api/breakdowns/' + id, params, { headers: loginHeaders() })
        dispatch(patchBreakdownSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(patchBreakdownFailure(err.response.data.errors))
      }
      console.error(err)
    }
  }
}
