import * as actionTypes from 'utils/actionTypes'
import { CategoriesStore } from 'types/store'
import { CategoriesAction } from 'types/action'

const initialState = {
  isLoading: false,
  categories: [],
  errors: []
}

const placeCategoriesReducer = (state: CategoriesStore = initialState, action: CategoriesAction): CategoriesStore => {
  switch (action.type) {
  case actionTypes.GET_PLACE_CATEGORIES_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PLACE_CATEGORIES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      categories: action.categories
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

export default placeCategoriesReducer
