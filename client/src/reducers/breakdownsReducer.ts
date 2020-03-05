import * as actionTypes from 'utils/actionTypes'
import { BreakdownsStore } from 'types/store'
import { BreakdownsAction } from 'types/action'

const initialState = {
  isLoading: false,
  breakdowns: []
}

const breakdownsReducer = (state: BreakdownsStore = initialState, action: BreakdownsAction): {} => {
  switch (action.type) {
  case actionTypes.GET_BREAKDOWNS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_BREAKDOWNS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      breakdowns: action.breakdowns
    }
  case actionTypes.GET_BREAKDOWNS_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default breakdownsReducer
