import * as actionTypes from 'utils/actionTypes'
import { RecordsStore } from 'types/store'
import { RecordsAction } from 'types/action'

const initialState = {
  isLoading: false,
  records: [],
  errors: []
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
      records: action.records
    }
  case actionTypes.GET_RECORDS_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default recordsReducer
