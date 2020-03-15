import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { RecordsAction } from 'types/action'
import { Record, RecordSearchParams } from 'types/api'

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
