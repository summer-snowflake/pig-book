import React from 'react'
import { Action } from 'redux'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { RegistrationStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { Errors } from 'types/api'

const initialState = {
  isLoading: false,
  errors: []
}

interface RegistrationAction extends Action {
  errors: Errors;
}

const registrationReducer = (state: RegistrationStore = initialState, action: RegistrationAction): {} => {
  switch (action.type) {
  case actionTypes.SIGN_UP_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.SIGN_UP_SUCCESS:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.SIGN_UP_FAILURE:
    toast.error(<FlashMessage actionType={actionTypes.SIGN_UP_FAILURE} />)
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  default:
    return state
  }
}

export default registrationReducer
