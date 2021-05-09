import * as actionTypes from 'utils/actionTypes'
import { DashboardAction } from 'types/action'
import { DashboardStore } from 'types/store'

const initialState = {
  isLoading: false,
  year: (new Date()).getFullYear(),
  event: null,
  monthly_total: [],
  yearly_total: {
    year: (new Date()).getFullYear(),
    income: 0,
    expenditure: 0,
    cashless_charge: 0,
    point: 0,
    currency: 'yen',
    category_id: null,
    label: ''
  },
  yearly_category_income: [],
  yearly_category_expenditure: [],
  yearly_breakdown_income: [],
  yearly_breakdown_expenditure: [],
  categories: []
}

const dashboardReducer = (state: DashboardStore = initialState, action: DashboardAction): DashboardStore => {
  switch (action.type) {
  case actionTypes.GET_DASHBOARD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_DASHBOARD_SUCCESS:
    return {
      ...state,
      year: action.dashboard.year,
      isLoading: false,
      event: action.dashboard.event,
      monthly_total: action.dashboard.monthly_total,
      yearly_total: action.dashboard.yearly_total,
      yearly_category_income: action.dashboard.yearly_category_income,
      yearly_category_expenditure: action.dashboard.yearly_category_expenditure,
      yearly_breakdown_income: action.dashboard.yearly_breakdown_income,
      yearly_breakdown_expenditure: action.dashboard.yearly_breakdown_expenditure,
      categories: action.dashboard.categories
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
  case actionTypes.CLEAR_DASHBOARD:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default dashboardReducer
