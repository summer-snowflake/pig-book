import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditBreakdownStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'
import { Breakdown } from 'types/api'

const initialState = {
  isLoading: false,
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

const editBreakdownReducer = (state: EditBreakdownStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.PATCH_BREAKDOWN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      breakdown: {
        id: 0,
        name: '',
        category_id: 0,
        category: {
          id: 0,
          name: '',
          balance_of_payments: false
        }
      },
      editedBreakdownId: action.breakdown.id,
      errors: []
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
      breakdown: action.breakdown,
      errors: []
    }
  case actionTypes.EXIT_BREAKDOWN:
    return {
      ...state,
      breakdown: {
        id: 0,
        name: '',
        category_id: 0,
        category: {
          id: 0,
          name: '',
          balance_of_payments: false
        }
      },
      errors: []
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
  default:
    return state
  }
}

export default editBreakdownReducer
