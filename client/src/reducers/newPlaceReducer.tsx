import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Errors } from 'types/api'
import { NewPlaceStore } from 'types/store'
import { PlaceAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  name: '',
  errors: []
}

interface StoreAction extends PlaceAction {
  name: string;
  errors: Errors;
}

const placeReducer = (state: NewPlaceStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.POST_PLACE_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_PLACE_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      name: '',
      errors: []
    }
  case actionTypes.POST_PLACE_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_PLACE_NAME:
    return {
      ...state,
      name: action.name
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

export default placeReducer
