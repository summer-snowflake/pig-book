import React from 'react'
import * as actionTypes from 'utils/actionTypes'
import { toast } from 'react-toastify'

import { EditAssetsAccountStore } from 'types/store'
import FlashMessage from 'components/common/flashMessage'
import { ErrorsAction } from 'types/action'
import { AssetsAccount } from 'types/api'

const initialState = {
  isLoading: false,
  isOpen: false,
  editedAssetsAccountId: 0,
  id: 0,
  balance_of_payments: true,
  name: '',
  currency: 'yen',
  money: '',
  position: null,
  checked: false,
  errors: []
}

interface StoreAction extends ErrorsAction {
  id: number,
  balance_of_payments: boolean,
  name: string,
  currency: string,
  money: string,
  position: number | null,
  checked: boolean,
  assetsAccount: AssetsAccount
}

const editAssetsAccountReducer = (state: EditAssetsAccountStore = initialState, action: StoreAction): EditAssetsAccountStore => {
  switch (action.type) {
  case actionTypes.PATCH_ASSETS_ACCOUNT_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_ASSETS_ACCOUNT_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      isOpen: false,
      editedAssetsAccountId: action.assetsAccount.id,
      errors: []
    }
  case actionTypes.PATCH_ASSETS_ACCOUNT_FAILURE:
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
  case actionTypes.OPEN_EDIT_ASSETS_ACCOUNT_MODAL:
    return {
      ...state,
      isOpen: true,
      id: action.assetsAccount.id,
      balance_of_payments: action.assetsAccount.balance_of_payments,
      name: action.assetsAccount.name,
      currency: action.assetsAccount.currency,
      money: String(action.assetsAccount.money),
      position: action.assetsAccount.position,
      checked: action.assetsAccount.checked
    }
  case actionTypes.CLOSE_EDIT_ASSETS_ACCOUNT_MODAL:
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

export default editAssetsAccountReducer
