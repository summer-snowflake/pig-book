import * as actionTypes from 'utils/actionTypes'
import { PiggyItemsStore } from 'types/store'
import { PiggyItemsAction } from 'types/action'

const initialState = {
  isLoading: false,
  piggyItems: [],
  errors: []
}

interface WithErrorsAction extends PiggyItemsAction {
  errors: string[];
}

const piggyItemsReducer = (state: PiggyItemsStore = initialState, action: WithErrorsAction): PiggyItemsStore => {
  switch (action.type) {
  case actionTypes.GET_PIGGY_ITEMS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PIGGY_ITEMS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      piggyItems: action.piggyItems
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

export default piggyItemsReducer
