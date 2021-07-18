import * as actionTypes from 'utils/actionTypes'
import { ResponseErrorsAction } from 'types/action'
import { Action } from 'redux'

export const catchErrors = (errorResponse: Response): ResponseErrorsAction => {
  return {
    type: actionTypes.CATCH_ERRORS,
    errorResponse
  }
}

export const clearMessages = (): Action => {
  return {
    type: actionTypes.CLEAR_MESSAGES
  }
}
