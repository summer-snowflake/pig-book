import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { RecordsAction, ErrorsAction } from 'types/action'
import { Record, RecordSearchParams, Errors } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'

const getRecordsRequest = (): Action => {
  return {
    type: actionTypes.GET_RECORDS_REQUEST
  }
}

const getRecordsSuccess = (records: Record[]): RecordsAction => {
  return {
    type: actionTypes.GET_RECORDS_SUCCESS,
    records
  }
}

const getRecordsFailure = (): Action => {
  return {
    type: actionTypes.GET_RECORDS_FAILURE
  }
}

export const getRecords = (params?: RecordSearchParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getRecordsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/records', { params: params, headers: loginHeaders() })
        dispatch(getRecordsSuccess(res.data))
      } else {
        dispatch(getRecordsFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}

const deleteRecordRequest = (): Action => {
  return {
    type: actionTypes.DELETE_RECORD_REQUEST
  }
}

const deleteRecordSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_RECORD_SUCCESS
  }
}

const deleteRecordFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_RECORD_FAILURE,
    errors
  }
}

export const deleteRecord = (recordId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deleteRecordRequest())

    try {
      if(ready()) {
        await axios.delete('/api/records/' + recordId, { headers: loginHeaders() })
        dispatch(deleteRecordSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      console.error(err)
      dispatch(deleteRecordFailure(err.response.data.errors))
    }
  }
}
