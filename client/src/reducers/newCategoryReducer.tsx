import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Errors } from 'types/api'
import { NewCategoryStore } from 'types/store'
import { CategoryAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  balance_of_payments: false,
  name: '',
  errors: []
}

interface StoreAction extends CategoryAction {
  balance_of_payments?: boolean;
  name: string;
  errors: Errors;
}

const categoryReducer = (state: NewCategoryStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.POST_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_CATEGORY_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      name: '',
      errors: []
    }
  case actionTypes.POST_CATEGORY_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_CATEGORY_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      balance_of_payments: action.balance_of_payments
    }
  case actionTypes.CHANGE_CATEGORY_NAME:
    return {
      ...state,
      name: action.name
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default categoryReducer
