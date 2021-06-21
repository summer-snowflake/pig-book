import * as actionTypes from 'utils/actionTypes'
import { MessagesStore } from 'types/store'
import { ErrorsAction } from 'types/action'

const initialState = {
  status: 200,
  messages: []
}

const messagesReducer = (state: MessagesStore = initialState, action: ErrorsAction): MessagesStore => {
  switch (action.type) {
  case actionTypes.LOGIN_FAILURE:
    return {
      ...state,
      status: 401,
      messages: action.errors
    }
  case actionTypes.CLEAR_MESSAGES:
    return {
      ...initialState
    }
  default:
    return {
      ...initialState
    }
  }
}

export default messagesReducer
