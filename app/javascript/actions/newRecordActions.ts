import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, RecordAction } from 'types/action'
import { Record, Errors, RecordParams } from 'types/api'
import { getCookiesFailure } from 'actions/userActions'
import { catchErrors } from 'actions/errorsAction'

const postRecordRequest = (): Action => {
  return {
    type: actionTypes.POST_RECORD_REQUEST
  }
}

const postRecordSuccess = (record: Record): RecordAction => {
  return {
    type: actionTypes.POST_RECORD_SUCCESS,
    record
  }
}

const postRecordFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_RECORD_FAILURE,
    errors
  }
}

export const postRecord = (params: RecordParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postRecordRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/records', params, { headers: loginHeaders() })
        dispatch(postRecordSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postRecordFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
