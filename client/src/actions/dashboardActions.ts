import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { DashboardAction } from 'types/action'
import { Dashboard } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userStatusActions'

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

export const getDashboard = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getDashboardRequest())
    try {
      if(ready()) {
        const year = (new Date()).getFullYear()
        const res = await axios.get('/api/dashboards/' + year, { headers: loginHeaders() })
        dispatch(getDashboardSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
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

export const patchDashboard = (year: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchDashboardRequest())
    try {
      if(ready()) {
        const params = {}
        const res = await axios.patch('/api/dashboards/' + year, params, { headers: loginHeaders() })
        dispatch(patchDashboardSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
