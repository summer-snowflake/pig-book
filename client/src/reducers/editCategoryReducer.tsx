import React from 'react';
import * as actionTypes from 'utils/actionTypes';
import { toast } from 'react-toastify';

import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  editingId: 0,
  errors: []
}

interface Action {
  type: string,
  editingId: number,
  data: {
    errors: string[]
  }
}

const editCategoryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.PATCH_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.PATCH_CATEGORY_SUCCESS:
      toast.success(<FlashMessage actionType={action.type} />);
      return {
        ...state,
        isLoading: false,
        editingId: 0,
        errors: []
      }
    case actionTypes.PATCH_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.data.errors
      }
    case actionTypes.SWITCH_EDITING:
      return {
        ...state,
        editingId: action.editingId,
        errors: []
      }
    default:
      return state;
  }
}

export default editCategoryReducer;
