import * as actionTypes from 'utils/actionTypes'
import { DashboardAction } from 'types/action'
import { DashboardStore } from 'types/store'

const initialState = {
  isLoading: false,
  year: (new Date()).getFullYear(),
  event: null,
  monthly: []
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
      event: action.dashboard.event
    }
  case actionTypes.GET_DASHBOARD_FAILURE:
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
      isLoading: false,
      event: action.dashboard.event
    }
  case actionTypes.PATCH_DASHBOARD_FAILURE:
    return {
      ...state,
      isLoading: false
    }
 
  default:
    return state
  }
}

export default dashboardReducer
