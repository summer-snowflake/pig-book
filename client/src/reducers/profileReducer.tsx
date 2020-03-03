import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { ProfileStore } from 'types/store'
import { ProfileAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  editing: false,
  editingMemo: false,
  locale: 'ja',
  currency: 'yen',
  memo: ''
}

interface StoreAction extends ProfileAction {
  locale?: string;
  currency?: string;
  memo?: string;
  editing?: boolean;
  editingMemo?: boolean;
}

const settingsReducer = (state: ProfileStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
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
    return {
      ...state,
      isLoading: false,
      locale: action.profile?.locale,
      currency: action.profile?.currency,
      memo: action.profile?.memo
    }
  case actionTypes.PATCH_PROFILE_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)

    return {
      ...state,
      isLoading: false,
      editing: false,
      editingMemo: false,
      locale: action.profile?.locale,
      currency: action.profile?.currency,
      memo: action.profile?.memo
    }
  case actionTypes.GET_PROFILE_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.PATCH_PROFILE_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.CHANGE_PROFILE_LOCALE:
    return {
      ...state,
      locale: action.locale
    }
  case actionTypes.CHANGE_PROFILE_CURRENCY:
    return {
      ...state,
      currency: action.currency
    }
  case actionTypes.SET_EDITING:
    return {
      ...state,
      editing: action.editing
    }
  case actionTypes.SET_EDITING_MEMO:
    return {
      ...state,
      editingMemo: action.editingMemo
    }
  default:
    return state
  }
}

export default settingsReducer
