import * as actionTypes from 'utils/actionTypes'
import { CategoriesStore } from 'types/store'
import { CategoriesAction } from 'types/action'

const initialState = {
  isLoading: false,
  categories: []
}

const categoriesReducer = (state: CategoriesStore = initialState, action: CategoriesAction): {} => {
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
  case actionTypes.GET_CATEGORIES_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default categoriesReducer
