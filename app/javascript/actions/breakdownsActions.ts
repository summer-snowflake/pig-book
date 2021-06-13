import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { BreakdownsAction } from 'types/action'
import { Breakdown } from 'types/api'
import { catchErrors } from './errorsAction'
import { getCookiesFailure } from './userActions'

const getBreakdownsRequest = (): Action => {
  return {
    type: actionTypes.GET_BREAKDOWNS_REQUEST
  }
}

const getBreakdownsSuccess = (breakdowns: Breakdown[]): BreakdownsAction => {
  return {
    type: actionTypes.GET_BREAKDOWNS_SUCCESS,
    breakdowns
  }
}

export const getBreakdowns = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getBreakdownsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/breakdowns', { headers: loginHeaders() })
        dispatch(getBreakdownsSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
