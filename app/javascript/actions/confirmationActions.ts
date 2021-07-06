import { Dispatch } from 'react'
import { Action } from 'redux'
import * as H from 'history'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ConfirmationParams } from 'types/api'
import { ErrorsAction } from 'types/action'
import { catchErrors } from 'actions/errorsActions'

const confirmEmailRequest = (): Action => {
  return {
    type: actionTypes.CONFIRM_EMAIL_REQUEST
  }
}

const confirmEmailSuccess = (): Action => {
  return {
    type: actionTypes.CONFIRM_EMAIL_SUCCESS
  }
}

const confirmEmailFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.CONFIRM_EMAIL_FAILURE,
    errors
  }
}

export const confirmEmail = (params: ConfirmationParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(confirmEmailRequest())
    try {
      await axios.post('/api/auth/confirmation', params)
      dispatch(confirmEmailSuccess())
    }
    catch(err) {
      if (err.response.status === 401 || err.response.status === 404) {
        dispatch(confirmEmailFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
