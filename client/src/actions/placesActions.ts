import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { PlacesAction } from 'types/action'
import { Place } from 'types/api'

interface WithEditingIdAction extends Action {
  editingId: number;
}

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

const getPlacesFailure = (): Action => {
  return {
    type: actionTypes.GET_PLACES_FAILURE
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
        dispatch(getPlacesFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
