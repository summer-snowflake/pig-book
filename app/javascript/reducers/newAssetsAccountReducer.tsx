import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { NewAssetsAccountStore } from 'types/store'
import { AssetsAccountAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  isOpen: false,
  balance_of_payments: true,
  name: '',
  currency: 'yen',
  money: '',
  position: null,
  checked: false,
  errors: []
}

interface StoreAction extends AssetsAccountAction {
  balance_of_payments: boolean;
  name: string;
  currency: string;
  money: string;
  position: number | null;
  checked: boolean;
  errors: string[];
}

const newAssetsAccountReducer = (state: NewAssetsAccountStore = initialState, action: StoreAction): NewAssetsAccountStore => {
  switch (action.type) {
  case actionTypes.POST_ASSETS_ACCOUNT_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_ASSETS_ACCOUNT_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      isOpen: false,
      balance_of_payments: true,
      name: '',
      money: '',
      position: null,
      errors: []
    }
  case actionTypes.POST_ASSETS_ACCOUNT_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_ASSETS_ACCOUNT_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      balance_of_payments: action.balance_of_payments
    }
  case actionTypes.CHANGE_ASSETS_ACCOUNT_NAME:
    return {
      ...state,
      name: action.name
    }
  case actionTypes.CHANGE_ASSETS_ACCOUNT_MONEY:
    return {
      ...state,
      money: action.money
    }
  case actionTypes.OPEN_NEW_ASSETS_ACCOUNT_MODAL:
    return {
      ...state,
      currency: action.currency,
      isOpen: true
    }
  case actionTypes.CLOSE_NEW_ASSETS_ACCOUNT_MODAL:
    return {
      ...state,
      isOpen: false
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

export default newAssetsAccountReducer
