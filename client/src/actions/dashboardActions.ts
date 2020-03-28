import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { DashboardAction } from 'types/action'
import { Dashboard } from 'types/api'

const getDashboardRequest = (): Action => {
  return {
    type: actionTypes.GET_DASHBOARD_REQUEST
  }
}

const getDashboardSuccess = (dashboard: Dashboard): DashboardAction => {
  return {
    type: actionTypes.GET_DASHBOARD_SUCCESS,
    dashboard
  }
}

const getDashboardFailure = (): Action => {
  return {
    type: actionTypes.GET_DASHBOARD_FAILURE
  }
}

export const getDashboard = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getDashboardRequest())
    try {
      if(ready()) {
        const year = (new Date()).getFullYear()
        const res = await axios.get('/api/dashboards/' + year, { headers: loginHeaders() })
        dispatch(getDashboardSuccess(res.data))
      } else {
        dispatch(getDashboardFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}

const patchDashboardRequest = (): Action => {
  return {
    type: actionTypes.PATCH_DASHBOARD_REQUEST
  }
}

const patchDashboardSuccess = (dashboard: Dashboard): DashboardAction => {
  return {
    type: actionTypes.PATCH_DASHBOARD_SUCCESS,
    dashboard
  }
}

const patchDashboardFailure = (): Action => {
  return {
    type: actionTypes.PATCH_DASHBOARD_FAILURE
  }
}

export const patchDashboard = (year: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchDashboardRequest())
    try {
      if(ready()) {
        const params = {}
        const res = await axios.patch('/api/dashboards/' + year, params, { headers: loginHeaders() })
        dispatch(patchDashboardSuccess(res.data))
      } else {
        dispatch(patchDashboardFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
