import * as actionTypes from 'utils/actionTypes'
import { DashboardsAction } from 'types/action'
import { DashboardsStore } from 'types/store'

const initialState = {
  isLoading: false,
  dashboards: []
}

const dashboardsReducer = (state: DashboardsStore = initialState, action: DashboardsAction): {} => {
  switch (action.type) {
  case actionTypes.GET_DASHBOARDS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_DASHBOARDS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      dashboards: action.dashboards
    }
  case actionTypes.GET_DASHBOARDS_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.PATCH_DASHBOARD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_DASHBOARD_SUCCESS:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.PATCH_DASHBOARD_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default dashboardsReducer
