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
