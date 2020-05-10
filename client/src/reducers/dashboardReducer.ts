import * as actionTypes from 'utils/actionTypes'
import { DashboardAction } from 'types/action'
import { DashboardStore } from 'types/store'

const initialState = {
  isLoading: false,
  year: (new Date()).getFullYear(),
  event: null,
  monthly: [],
  yearly: null,
  yearly_category_income: [],
  yearly_category_expenditure: []
}

const dashboardReducer = (state: DashboardStore = initialState, action: DashboardAction): {} => {
  switch (action.type) {
  case actionTypes.GET_DASHBOARD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_DASHBOARD_SUCCESS:
    return {
      ...state,
      isLoading: false,
      event: action.dashboard.event,
      monthly: action.dashboard.monthly,
      yearly: action.dashboard.yearly,
      yearly_category_income: action.dashboard.yearly_category_income,
      yearly_category_expenditure: action.dashboard.yearly_category_expenditure
    }
  case actionTypes.PATCH_DASHBOARD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_DASHBOARD_SUCCESS:
    return {
      ...state,
      isLoading: false,
      event: action.dashboard.event
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

export default dashboardReducer
