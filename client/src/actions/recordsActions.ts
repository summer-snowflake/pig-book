import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { RecordsAction } from 'types/action'
import { Record, RecordSearchParams, RecordTotals } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

interface WithRecordSearchParamsAction extends Action {
  params: RecordSearchParams;
}

interface WithPageAction extends Action {
  page: number;
}

const getRecordsRequest = (): Action => {
  return {
    type: actionTypes.GET_RECORDS_REQUEST
  }
}

const getRecordsSuccess = (records: Record[], max_page: number, total_count: number, totals: RecordTotals): RecordsAction => {
  return {
    type: actionTypes.GET_RECORDS_SUCCESS,
    records,
    max_page,
    total_count,
    totals
  }
}

export const getRecords = (params?: RecordSearchParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getRecordsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/records', { params: params, headers: loginHeaders() })
        dispatch(getRecordsSuccess(res.data.list, res.data.max_page, res.data.total_count, res.data.totals))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
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
      dispatch(catchErrors(err.response))
    }
  }
}

export const setRecordSearchParams = (params: RecordSearchParams): WithRecordSearchParamsAction => {
  return {
    type: actionTypes.SET_RECORD_SEARCH_PARAMS,
    params
  }
}

export const changePage = (page: number): WithPageAction => {
  return {
    type: actionTypes.CHANGE_PAGE,
    page
  }
}
