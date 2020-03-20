import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { RecordSearchStore } from 'types/store'
import { RecordSearchParams } from 'types/api'

const today = new Date()
const initialState = {
  date: null,
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  order: null
}

interface StoreAction extends Action {
  year: number;
  month: number;
  date: Date | null;
  params: RecordSearchParams;
}

const RecordSearchReducer = (state: RecordSearchStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.GET_MONTHLY_RECORDS:
    return {
      ...state,
      date: null,
      year: action.year,
      month: action.month,
      order: 'published_at'
    }
  case actionTypes.SET_DATE_AS_SEARCH:
    return {
      ...state,
      date: action.date
    }
  case actionTypes.SET_YEAR_AND_MONTH_AS_SEARCH:
    return {
      ...state,
      year: action.year,
      month: action.month
    }
  case actionTypes.SET_RECORD_SEARCH_PARAMS:
    return {
      ...state,
      year: action.params.year ? action.params.year : state.year,
      month: action.params.month ? action.params.month : state.month,
      date: action.params.date,
      order: action.params.order
    }
  default:
    return state
  }
}

export default RecordSearchReducer
