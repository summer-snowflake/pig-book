import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { BreakdownsStore } from 'types/store'
import { BreakdownsAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  breakdowns: [],
  errors: []
}

interface WithErrorsBreakdownsAction extends BreakdownsAction {
  errors: string[];
}

const breakdownsReducer = (state: BreakdownsStore = initialState, action: WithErrorsBreakdownsAction): {} => {
  switch (action.type) {
  case actionTypes.GET_BREAKDOWNS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_BREAKDOWNS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      breakdowns: action.breakdowns
    }
  case actionTypes.GET_BREAKDOWNS_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_BREAKDOWN_FAILURE:
    toast.error(<FlashMessage actionType={action.type} messages={action.errors.toString()} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default breakdownsReducer
