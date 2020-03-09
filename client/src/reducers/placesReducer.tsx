import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { PlacesStore } from 'types/store'
import { PlacesAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  places: [],
  errors: []
}

interface WithErrorsPlacesAction extends PlacesAction {
  errors: string[];
}

const placesReducer = (state: PlacesStore = initialState, action: WithErrorsPlacesAction): {} => {
  switch (action.type) {
  case actionTypes.GET_PLACES_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PLACES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      places: action.places
    }
  case actionTypes.GET_PLACES_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_PLACE_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.DELETE_PLACE_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_PLACE_FAILURE:
    toast.error(<FlashMessage actionType={action.type} messages={action.errors.toString()} />)
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default placesReducer
