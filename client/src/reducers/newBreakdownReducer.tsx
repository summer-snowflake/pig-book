import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Errors, Category } from 'types/api'
import { NewBreakdownStore } from 'types/store'
import { BreakdownAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  balance_of_payments: false,
  category_id: 0,
  name: '',
  errors: []
}

interface StoreAction extends BreakdownAction {
  name: string;
  category: Category;
  errors: Errors;
}

const newBreakdownReducer = (state: NewBreakdownStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.POST_BREAKDOWN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      name: '',
      errors: []
    }
  case actionTypes.POST_BREAKDOWN_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_BREAKDOWN_NAME:
    return {
      ...state,
      name: action.name
    }
  case actionTypes.CHANGE_CATEGORY:
    return {
      ...state,
      category_id: action.category?.id,
      balance_of_payments: action.category?.balance_of_payments || false
    }
  default:
    return state
  }
}

export default newBreakdownReducer
