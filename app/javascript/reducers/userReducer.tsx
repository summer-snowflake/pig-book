import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { UserStore } from 'types/store'
import { UserAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  isLogged: false,
  admin: null,
  profile: {
    locale: '',
    currency: '',
    memo: '',
  },
  email: '',
  dailyOption: false,
  unlimitedOption: false,
  piggyBankOption: false,
  optionsList: '',
  options: [],
  errors: [],
  recordsCount: 0,
  dashboardYears: []
}

interface StoreAction extends UserAction {
  errors: string[];
}

const userReducer = (state: UserStore = initialState, action: StoreAction): UserStore => {
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
  case actionTypes.GET_USER_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLogged: false
    }
  case actionTypes.GET_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLogged: true,
      dailyOption: action.user.daily_option,
      unlimitedOption: action.user.unlimited_option,
      piggyBankOption: action.user.piggy_bank_option,
      admin: action.user.admin,
      profile: action.user.profile,
      email: action.user.email,
      optionsList: action.user.options_list,
      options: action.user.options,
      recordsCount: action.user.records_count,
      dashboardYears: action.user.dashboard_years,
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
      piggyBankOption: action.user.piggy_bank_option,
      optionsList: action.user.options_list,
      options: action.user.options,
      recordsCount: action.user.records_count,
      dashboardYears: action.user.dashboard_years,
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

export default userReducer
