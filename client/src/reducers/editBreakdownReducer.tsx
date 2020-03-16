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
    }
  },
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
      errors: []
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
  default:
    return state
  }
}

export default editBreakdownReducer
