import React from 'react'
import { Action } from 'redux'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { ConfirmationStore } from 'types/store'
import { ConfirmationAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  errors: []
}

const confirmationReducer = (state: ConfirmationStore = initialState, action: ConfirmationAction): ConfirmationStore => {
  switch (action.type) {
  case actionTypes.CONFIRM_EMAIL_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.CONFIRM_EMAIL_SUCCESS:
    toast.success(<FlashMessage actionType={actionTypes.CONFIRM_EMAIL_SUCCESS} />)
    return {
      ...state,
      errors: []
    }
  case actionTypes.CONFIRM_EMAIL_FAILURE:
    toast.error(<FlashMessage actionType={actionTypes.CONFIRM_EMAIL_FAILURE} />)
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  default:
    return state
  }
}

export default confirmationReducer
