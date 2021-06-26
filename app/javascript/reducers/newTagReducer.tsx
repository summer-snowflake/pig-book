import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { NewTagStore } from 'types/store'
import { TagAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  name: '',
  color_code: '#' + Math.floor(Math.random() * 16777215).toString(16),
  errors: []
}

interface StoreAction extends TagAction {
  name: string;
  color: string;
  errors: string[];
}

const tagReducer = (state: NewTagStore = initialState, action: StoreAction): NewTagStore => {
  switch (action.type) {
  case actionTypes.POST_TAG_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_TAG_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      name: '',
      errors: []
    }
  case actionTypes.POST_TAG_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_TAG_COLOR_CODE:
    return {
      ...state,
      color_code: action.color
    }
  case actionTypes.CHANGE_TAG_NAME:
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

export default tagReducer
