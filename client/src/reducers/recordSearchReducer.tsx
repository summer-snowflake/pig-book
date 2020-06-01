import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { RecordSearchStore } from 'types/store'
import { RecordSearchResponseParams } from 'types/api'

const today = new Date()
const initialState = {
  page: 1,
  date: null,
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  order: null,
  category_id: null,
  category_name: null,
  breakdown_id: null,
  breakdown_name: null,
  place_id: null,
  place_name: null
}

interface StoreAction extends Action {
  page: number;
  year: number;
  month: number;
  date: Date | null;
  params: RecordSearchResponseParams;
}

const RecordSearchReducer = (state: RecordSearchStore = initialState, action: StoreAction): RecordSearchStore => {
  switch (action.type) {
  case actionTypes.SET_RECORD_SEARCH_PARAMS:
    return {
      ...state,
      year: action.params.year,
      month: action.params.month,
      date: action.params.date,
      order: action.params.order,
      category_id: action.params.category_id,
      category_name: action.params.category_name,
      breakdown_id: action.params.breakdown_id,
      breakdown_name: action.params.breakdown_name,
      place_id: action.params.place_id,
      place_name: action.params.place_name
    }
  case actionTypes.CHANGE_PAGE:
    return {
      ...state,
      page: action.page
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default RecordSearchReducer
