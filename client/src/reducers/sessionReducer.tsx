import React from 'react'
import { Action } from 'redux'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { SessionStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false
}

const sessionReducer = (state: SessionStore = initialState, action: Action): {} => {
  switch (action.type) {
  case actionTypes.LOGIN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.LOGIN_SUCCESS:
    toast.success(<FlashMessage actionType={actionTypes.LOGIN_SUCCESS} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.LOGIN_FAILURE:
    toast.error(<FlashMessage actionType={actionTypes.LOGIN_FAILURE} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.LOGOUT_SUCCESS:
    toast.success(<FlashMessage actionType={actionTypes.LOGOUT_SUCCESS} />)
    return {
      ...state
    }
  default:
    return state
  }
}

export default sessionReducer