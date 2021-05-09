import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, RecordAction } from 'types/action'
import { Record, Errors, RecordParams } from 'types/api'
import { getCookiesFailure } from 'actions/userActions'
import { catchErrors } from 'actions/errorsAction'

const patchRecordRequest = (): Action => {
  return {
    type: actionTypes.PATCH_RECORD_REQUEST
  }
}

const patchRecordSuccess = (record: Record): RecordAction => {
  return {
    type: actionTypes.PATCH_RECORD_SUCCESS,
    record
  }
}

const patchRecordFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.PATCH_RECORD_FAILURE,
    errors
  }
}

export const patchRecord = (recordId: number, params: RecordParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchRecordRequest())
    try {
      if(ready()) {
        const res = await axios.patch('/api/records/' + recordId, params, { headers: loginHeaders() })
        dispatch(patchRecordSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchRecordFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
