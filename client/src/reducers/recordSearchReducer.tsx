import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { RecordSearchStore } from 'types/store'

const today = new Date()
const initialState = {
  date: null,
  year: today.getFullYear(),
  month: today.getMonth() + 1
}

interface StoreAction extends Action {
  year: number;
  month: number;
  date: Date | null;
}

const RecordSearchReducer = (state: RecordSearchStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.GET_MONTHLY_RECORDS:
    return {
      ...state,
      date: null,
      year: action.year,
      month: action.month
    }
  case actionTypes.SET_DATE_AS_SEARCH:
    return {
      ...state,
      date: action.date
    }
  default:
    return state
  }
}

export default RecordSearchReducer
