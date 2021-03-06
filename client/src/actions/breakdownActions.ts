import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, BreakdownAction } from 'types/action'
import { BreakdownParams, Errors, Breakdown } from 'types/api'
import { getCookiesFailure } from 'actions/userActions'
import { catchErrors } from 'actions/errorsAction'

const postBreakdownRequest = (): Action => {
  return {
    type: actionTypes.POST_BREAKDOWN_REQUEST
  }
}

const postBreakdownSuccess = (breakdown: Breakdown): BreakdownAction => {
  return {
    type: actionTypes.POST_BREAKDOWN_SUCCESS,
    breakdown
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
        const res = await axios.post('/api/breakdowns', params, { headers: loginHeaders() })
        dispatch(postBreakdownSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postBreakdownFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchBreakdownRequest = (): Action => {
  return {
    type: actionTypes.PATCH_BREAKDOWN_REQUEST
  }
}

const patchBreakdownSuccess = (breakdown: Breakdown): BreakdownAction => {
  return {
    type: actionTypes.PATCH_BREAKDOWN_SUCCESS,
    breakdown
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
        const res = await axios.patch('/api/breakdowns/' + id, params, { headers: loginHeaders() })
        dispatch(patchBreakdownSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchBreakdownFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deleteBreakdownRequest = (): Action => {
  return {
    type: actionTypes.DELETE_BREAKDOWN_REQUEST
  }
}

const deleteBreakdownSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_BREAKDOWN_SUCCESS
  }
}

const deleteBreakdownFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_BREAKDOWN_FAILURE,
    errors
  }
}

export const deleteBreakdown = (breakdownId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deleteBreakdownRequest())

    try {
      if(ready()) {
        await axios.delete('/api/breakdowns/' + breakdownId, { headers: loginHeaders() })
        dispatch(deleteBreakdownSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deleteBreakdownFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
