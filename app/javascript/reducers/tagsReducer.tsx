import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { TagsStore } from 'types/store'
import { TagsAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  tags: [],
  errors: []
}

interface WithErrorsTagsAction extends TagsAction {
  errors: string[];
}

const tagsReducer = (state: TagsStore = initialState, action: WithErrorsTagsAction): TagsStore => {
  switch (action.type) {
  case actionTypes.GET_TAGS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_TAGS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      tags: action.tags
    }
  case actionTypes.DELETE_TAG_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.DELETE_TAG_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_TAG_FAILURE:
    toast.error(<FlashMessage actionType={action.type} messages={action.errors.toString()} />)
    return {
      ...state,
      isLoading: false
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

export default tagsReducer
