import * as actionTypes from 'utils/actionTypes'
import { ResponseErrorsStore } from 'types/store'
import { ResponseErrorsAction } from 'types/action'

const initialState = {
  status: 200
}

const errorsReducer = (state: ResponseErrorsStore = initialState, action: ResponseErrorsAction): ResponseErrorsStore => {
  switch (action.type) {
  case actionTypes.CATCH_ERRORS:
    return {
      ...state,
      status: action.errorResponse?.status
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...state,
      status: 401
    }
  default:
    return {
      ...initialState
    }
  }
}

export default errorsReducer
