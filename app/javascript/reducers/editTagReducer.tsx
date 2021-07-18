import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditTagStore } from 'types/store'
import FlashMessage from 'components/common/FlashMessage'
import { ErrorsAction } from 'types/action'
import { Tag } from 'types/api'

const initialState = {
  isLoading: false,
  isEditing: false,
  tag: {
    id: 0,
    name: '',
    color_code: ''
  },
  editedTagId: 0,
  errors: []
}

interface WithEditingIdAction extends ErrorsAction {
  tagId: number;
  tag: Tag;
}

const editTagReducer = (state: EditTagStore = initialState, action: WithEditingIdAction): EditTagStore => {
  switch (action.type) {
  case actionTypes.PATCH_TAG_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_TAG_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState,
      editedTagId: action.tag.id
    }
  case actionTypes.PATCH_TAG_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.POST_TAG_SUCCESS:
    return {
      ...state,
      editedTagId: action.tag.id
    }
  case actionTypes.EDIT_TAG:
    return {
      ...state,
      isEditing: true,
      tag: action.tag,
    }
  case actionTypes.EXIT_TAG:
    return {
      ...initialState
    }
  case actionTypes.CLEAR_EDITED_TAG:
    return {
      ...state,
      editedTagId: 0
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

export default editTagReducer
