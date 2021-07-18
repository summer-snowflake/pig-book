import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { NewCategoryStore } from 'types/store'
import { CategoryAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  category: {
    balance_of_payments: false,
    name: ''
  },
  errors: []
}

interface StoreAction extends CategoryAction {
  balance_of_payments: boolean;
  name: string;
  errors: string[];
}

const categoryReducer = (state: NewCategoryStore = initialState, action: StoreAction): NewCategoryStore => {
  switch (action.type) {
  case actionTypes.POST_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_CATEGORY_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState
    }
  case actionTypes.POST_CATEGORY_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.NEW_CATEGORY:
    return {
      ...state,
      category: action.category
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

export default categoryReducer
