import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { UserStatusStore } from 'types/store'
import { UserAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  isLogged: false,
  admin: null,
  email: '',
  dailyOption: false,
  unlimitedOption: false,
  optionsList: '',
  options: [],
  errors: []
}

interface StoreAction extends UserAction {
  errors: string[];
}

const userStatusReducer = (state: UserStatusStore = initialState, action: StoreAction): UserStatusStore => {
  switch (action.type) {
  case actionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLogged: true
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_USER_STATUS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLogged: false
    }
  case actionTypes.GET_USER_STATUS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLogged: true,
      dailyOption: action.user.daily_option,
      unlimitedOption: action.user.unlimited_option,
      admin: action.user.admin,
      email: action.user.email,
      optionsList: action.user.options_list,
      options: action.user.options,
      errors: []
    }
  case actionTypes.PATCH_USER_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_USER_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      dailyOption: action.user.daily_option,
      unlimitedOption: action.user.unlimited_option,
      optionsList: action.user.options_list,
      options: action.user.options,
      errors: []
    }
  case actionTypes.PATCH_USER_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default userStatusReducer
