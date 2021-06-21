import * as actionTypes from 'utils/actionTypes'
import { PiggyBanksStore } from 'types/store'
import { PiggyBanksAction } from 'types/action'

const initialState = {
  isLoading: false,
  piggyBanks: [],
  errors: []
}

interface WithErrorsAction extends PiggyBanksAction {
  errors: string[];
}

const piggyBanksReducer = (state: PiggyBanksStore = initialState, action: WithErrorsAction): PiggyBanksStore => {
  switch (action.type) {
  case actionTypes.GET_PIGGY_BANKS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PIGGY_BANKS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      piggyBanks: action.piggyBanks
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

export default piggyBanksReducer
