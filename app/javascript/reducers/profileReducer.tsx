import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { ProfileStore } from 'types/store'
import { ProfileAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'
import i18next from 'i18next'

const initialState = {
  isLoading: false,
  isLoadingMemo: false,
  editingMemo: false,
  locale: 'ja',
  currency: 'yen',
  memo: ''
}

interface StoreAction extends ProfileAction {
  locale: string;
  currency: string;
  memo: string;
  editingMemo: boolean;
}

const profileReducer = (state: ProfileStore = initialState, action: StoreAction): ProfileStore => {
  switch (action.type) {
  case actionTypes.LOGIN_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_PROFILE_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_PROFILE_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PROFILE_SUCCESS:
    i18next.changeLanguage(action.profile?.locale || 'ja')

    return {
      ...state,
      isLoading: false,
      locale: action.profile?.locale,
      currency: action.profile?.currency,
      memo: action.profile?.memo
    }
  case actionTypes.PATCH_PROFILE_SUCCESS:
    i18next.changeLanguage(action.profile?.locale || 'ja')
    toast.success(<FlashMessage actionType={action.type} />)

    return {
      ...state,
      isLoading: false,
      locale: action.profile?.locale,
      memo: action.profile?.memo
    }
  case actionTypes.SET_EDITING_MEMO:
    return {
      ...state
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

export default profileReducer
