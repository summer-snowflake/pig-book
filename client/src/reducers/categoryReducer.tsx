import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  balance_of_payments: false,
  name: '',
  errors: []
}

interface Action {
  type: string;
  balance_of_payments?: boolean;
  name: string;
  data: {
    errors: string[];
  };
}

const categoryReducer = (state = initialState, action: Action): {} => {
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
      errors: action.data.errors
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
  default:
    return state
  }
}

export default categoryReducer
