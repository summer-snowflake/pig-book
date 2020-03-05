import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditBreakdownStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'

const initialState = {
  isLoading: false,
  editingId: 0,
  errors: []
}

interface WithEditingIdAction extends ErrorsAction {
  editingId: number;
}

const editBreakdownReducer = (state: EditBreakdownStore = initialState, action: WithEditingIdAction): {} => {
  switch (action.type) {
  case actionTypes.PATCH_BREAKDOWN_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_BREAKDOWN_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      editingId: 0,
      errors: []
    }
  case actionTypes.PATCH_BREAKDOWN_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.SWITCH_EDITING:
    return {
      ...state,
      editingId: action.editingId,
      errors: []
    }
  default:
    return state
  }
}

export default editBreakdownReducer
