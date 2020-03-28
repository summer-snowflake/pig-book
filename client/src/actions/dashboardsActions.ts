import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { DashboardsAction } from 'types/action'
import { Dashboard } from 'types/api'

const getDashboardsRequest = (): Action => {
  return {
    type: actionTypes.GET_DASHBOARDS_REQUEST
  }
}

const getDashboardsSuccess = (dashboards: Dashboard[]): DashboardsAction => {
  return {
    type: actionTypes.GET_DASHBOARDS_SUCCESS,
    dashboards
  }
}

const getDashboardsFailure = (): Action => {
  return {
    type: actionTypes.GET_DASHBOARDS_FAILURE
  }
}

export const getDashboards = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getDashboardsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/dashboards/', { headers: loginHeaders() })
        dispatch(getDashboardsSuccess(res.data))
      } else {
        dispatch(getDashboardsFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
