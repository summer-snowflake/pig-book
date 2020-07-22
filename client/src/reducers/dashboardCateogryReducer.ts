import * as actionTypes from 'utils/actionTypes'
import { DashboardCategoryAction } from 'types/action'
import { DashboardCategoryStore } from 'types/store'

const initialState = {
  isLoading: false,
  monthlyBreakdowns: [],
  category: {
    id: 0,
    name: '',
    balance_of_payments: false,
    breakdowns: [],
    places: []
  }
}

const dashboardCategoryReducer = (state: DashboardCategoryStore = initialState, action: DashboardCategoryAction): DashboardCategoryStore => {
  switch (action.type) {
  case actionTypes.GET_DASHBOARD_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_DASHBOARD_CATEGORY_SUCCESS:
    return {
      ...state,
      isLoading: false,
      monthlyBreakdowns: action.dashboard.monthly_breakdowns
    }
  case actionTypes.GET_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_CATEGORY_SUCCESS:
    return {
      ...state,
      isLoading: false,
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
  case actionTypes.CLEAR_DASHBOARD:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default dashboardCategoryReducer
