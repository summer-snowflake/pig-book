import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditCategoryStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'
import { Category } from 'types/api'

const initialState = {
  isLoading: false,
  category: {
    id: 0,
    balance_of_payments: false,
    name: ''
  },
  errors: []
}

interface StoreAction extends ErrorsAction {
  category: Category;
}

const editCategoryReducer = (state: EditCategoryStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.PATCH_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_CATEGORY_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      category: {
        id: 0,
        name: '',
        balance_of_payments: false
      },
      errors: []
    }
  case actionTypes.PATCH_CATEGORY_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.EDIT_CATEGORY:
    return {
      ...state,
      category: action.category,
      errors: []
    }
  case actionTypes.EXIT_CATEGORY:
    return {
      ...state,
      category: {
        id: 0,
        name: '',
        balance_of_payments: false
      },
      errors: []
    }
  default:
    return state
  }
}

export default editCategoryReducer
