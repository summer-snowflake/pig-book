import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Category } from 'types/api'
import { NewBreakdownStore } from 'types/store'
import { BreakdownAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  balance_of_payments: false,
  category_id: 0,
  name: '',
  errors: [],
  breakdown: {
    id: 0,
    name: '',
    category_id: 0,
    category: {
      id: 0,
      name: '',
      balance_of_payments: false
    },
  }
}

interface StoreAction extends BreakdownAction {
  name: string;
  category: Category;
  errors: string[];
}

const newBreakdownReducer = (state: NewBreakdownStore = initialState, action: StoreAction): NewBreakdownStore => {
  switch (action.type) {
  case actionTypes.POST_BREAKDOWN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState
    }
  case actionTypes.POST_BREAKDOWN_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.NEW_BREAKDOWN:
    return {
      ...state,
      breakdown: action.breakdown
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

export default newBreakdownReducer
