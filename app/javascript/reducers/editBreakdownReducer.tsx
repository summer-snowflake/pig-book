import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditBreakdownStore } from 'types/store'
import FlashMessage from 'components/common/FlashMessage'
import { ErrorsAction } from 'types/action'
import { Breakdown } from 'types/api'

const initialState = {
  isLoading: false,
  isEditing: false,
  breakdown: {
    id: 0,
    name: '',
    category_id: 0,
    category: {
      id: 0,
      name: '',
      balance_of_payments: false
    },
  },
  editedBreakdownId: 0,
  errors: []
}

interface StoreAction extends ErrorsAction {
  breakdown: Breakdown;
}

const editBreakdownReducer = (state: EditBreakdownStore = initialState, action: StoreAction): EditBreakdownStore => {
  switch (action.type) {
  case actionTypes.PATCH_BREAKDOWN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState,
      editedBreakdownId: action.breakdown.id
    }
  case actionTypes.POST_BREAKDOWN_SUCCESS:
    return {
      ...state,
      editedBreakdownId: action.breakdown.id
    }
  case actionTypes.PATCH_BREAKDOWN_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.EDIT_BREAKDOWN:
    return {
      ...state,
      isEditing: true,
      breakdown: action.breakdown
    }
  case actionTypes.EXIT_BREAKDOWN:
    return {
      ...initialState
    }
  case actionTypes.CLEAR_EDITED_BREAKDOWN:
    return {
      ...state,
      editedBreakdownId: 0
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default editBreakdownReducer
