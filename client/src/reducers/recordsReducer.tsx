import * as actionTypes from 'utils/actionTypes'
import { RecordsStore } from 'types/store'
import { RecordsAction } from 'types/action'

const initialState = {
  isLoading: false,
  records: [],
  errors: [],
  maxPage: 1,
  totals: {
    human_income_charge: '',
    human_expenditure_charge: '',
    human_all_charge: '',
    use_cashless_charge: 0,
    use_point: 0
  }
}

const recordsReducer = (state: RecordsStore = initialState, action: RecordsAction): {} => {
  switch (action.type) {
  case actionTypes.GET_RECORDS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_RECORDS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      records: action.records,
      maxPage: action.max_page,
      totals: action.totals
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

export default recordsReducer
