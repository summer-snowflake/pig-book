import * as actionTypes from 'utils/actionTypes'
import { TutorialStore } from 'types/store'
import { TutorialAction } from 'types/action'

const initialState = {
  isLoading: false,
  categoryExists: true,
  breakdownExists: true,
  placeExists: true,
  recordExists: true
}

const tutorialReducer = (state: TutorialStore = initialState, action: TutorialAction): TutorialStore => {
  switch (action.type) {
  case actionTypes.GET_TUTORIAL_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_TUTORIAL_SUCCESS:
    return {
      ...state,
      isLoading: false,
      categoryExists: action.tutorial.user.categories_count > 0,
      breakdownExists: action.tutorial.user.breakdowns_count > 0,
      placeExists: action.tutorial.user.places_count > 0,
      recordExists: action.tutorial.user.records_count > 0
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

export default tutorialReducer
