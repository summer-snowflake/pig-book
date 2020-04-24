import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { PlacesAction } from 'types/action'
import { Place } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userStatusActions'

const getPlacesRequest = (): Action => {
  return {
    type: actionTypes.GET_PLACES_REQUEST
  }
}

const getPlacesSuccess = (places: Place[]): PlacesAction => {
  return {
    type: actionTypes.GET_PLACES_SUCCESS,
    places
  }
}

export const getPlaces = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getPlacesRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/places', { headers: loginHeaders() })
        dispatch(getPlacesSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
