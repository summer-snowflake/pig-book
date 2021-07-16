import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { AlertStore } from 'types/store'

const initialState = {
  isOpen: false,
  messageType: ''
}

interface WithMessageAction extends Action {
  messageType: string;
}

const breakdownsReducer = (state: AlertStore = initialState, action: WithMessageAction): AlertStore => {
  switch (action.type) {
  case actionTypes.OPEN_ALERT_MODAL:
    return {
      ...state,
      isOpen: true,
      messageType: action.messageType
    }
  case actionTypes.CLOSE_ALERT_MODAL:
    return {
      ...initialState
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

export default breakdownsReducer
