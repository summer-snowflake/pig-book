import * as actionTypes from 'utils/actionTypes'
import { ResponseErrorsAction } from 'types/action'

export const catchErrors = (errorResponse: Response): ResponseErrorsAction => {
  return {
    type: actionTypes.CATCH_ERRORS,
    errorResponse
  }
}
