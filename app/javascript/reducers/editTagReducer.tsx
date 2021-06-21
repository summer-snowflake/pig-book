import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditTagStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'
import { Tag } from 'types/api'

const initialState = {
  isLoading: false,
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
      ...state,
      isLoading: false,
      tag: {
        name: ''
      },
      editedTagId: action.tag.id,
      errors: []
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
      tag: action.tag,
      errors: []
    }
  case actionTypes.EXIT_TAG:
    return {
      ...initialState
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
