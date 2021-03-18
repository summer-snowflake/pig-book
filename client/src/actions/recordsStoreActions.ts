import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { RecordSearchParams } from 'types/api'

interface WithRecordSearchParamsAction extends Action {
  params: RecordSearchParams;
}

interface WithPageAction extends Action {
  page: number;
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
