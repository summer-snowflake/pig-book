import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { RegistrationStore } from 'types/store'
import { RegistrationAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  errors: []
}

const registrationReducer = (state: RegistrationStore = initialState, action: RegistrationAction): RegistrationStore => {
  switch (action.type) {
  case actionTypes.SIGN_UP_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.SIGN_UP_SUCCESS:
    toast.success(<FlashMessage actionType={actionTypes.SIGN_UP_SUCCESS} />)
    return {
      ...state,
      isLoading: false,
      errors: []
    }
  case actionTypes.SIGN_UP_FAILURE:
    toast.error(<FlashMessage actionType={actionTypes.SIGN_UP_FAILURE} />)
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.RELOAD_SIGN_UP:
    return {
      ...state
    }
  case actionTypes.CONFIRM_USER_FAILURE:
    return {
      ...state,
      errors: action.errors
    }
  case actionTypes.CLEAR_ERRORS:
    return {
      ...state,
      errors: []
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default registrationReducer