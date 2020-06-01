import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { CategoriesStore } from 'types/store'
import { CategoriesAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  categories: [],
  errors: []
}

interface WithErrorsCategoriesAction extends CategoriesAction {
  errors: string[];
}

const categoriesReducer = (state: CategoriesStore = initialState, action: WithErrorsCategoriesAction): CategoriesStore => {
  switch (action.type) {
  case actionTypes.GET_CATEGORIES_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_CATEGORIES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      categories: action.categories
    }
  case actionTypes.DELETE_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.DELETE_CATEGORY_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_CATEGORY_FAILURE:
    toast.error(<FlashMessage actionType={action.type} messages={action.errors.toString()} />)
    return {
      ...state,
      isLoading: false
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

export default categoriesReducer
