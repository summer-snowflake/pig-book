import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { RecordSearchStore } from 'types/store'
import { RecordSearchParams } from 'types/api'

const today = new Date()
const initialState = {
  page: 1,
  date: null,
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  order: null,
  category_id: null,
  category_name: null
}

interface StoreAction extends Action {
  page: number;
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
      year: action.params.year,
      month: action.params.month,
      date: action.params.date,
      order: action.params.order,
      category_id: action.params.category_id,
      category_name: action.params.category_name
    }
  case actionTypes.CHANGE_PAGE:
    return {
      ...state,
      page: action.page
    }
  default:
    return state
  }
}

export default RecordSearchReducer
