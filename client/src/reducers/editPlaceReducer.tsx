import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditPlaceStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'
import { Place } from 'types/api'

const initialState = {
  isLoading: false,
  place: {
    id: 0,
    name: '',
    categories: []
  },
  errors: []
}

interface WithEditingIdAction extends ErrorsAction {
  editingId: number;
  place: Place;
}

const editPlaceReducer = (state: EditPlaceStore = initialState, action: WithEditingIdAction): {} => {
  switch (action.type) {
  case actionTypes.PATCH_PLACE_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_PLACE_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      place: {
        id: 0,
        name: '',
        categories: []
      },
      errors: []
    }
  case actionTypes.PATCH_PLACE_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.EDIT_PLACE:
    return {
      ...state,
      place: action.place,
      errors: []
    }
  case actionTypes.EXIT_PLACE:
    return {
      ...state,
      place: {
        id: 0,
        name: '',
        categories: []
      },
      errors: []
    }
  default:
    return state
  }
}

export default editPlaceReducer
