import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { AssetsAccountsStore } from 'types/store'
import { AssetsAccountsAction } from 'types/action'
import { AssetsAccount } from 'types/api'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  assetsAccounts: [],
  sum: 0,
  errors: []
}

interface WithErrorsAction extends AssetsAccountsAction {
  errors: string[];
}

const calculateTotalAssets = (assets: AssetsAccount[], currency: string): number => {
  const plusItems = assets
    .filter((account) => account.balance_of_payments && account.currency === currency)
    .map((account) => account.money)
  const minusItems = assets
    .filter((account) => !account.balance_of_payments && account.currency === currency)
    .map((account) => account.money)

  if (plusItems.length > 0 && minusItems.length > 0) {
    return plusItems.reduceRight((a, x) => a += x) - minusItems.reduceRight((a, x) => a += x)
  } else if (plusItems.length > 0) {
    return plusItems.reduceRight((a, x) => a += x)
  } else if (minusItems.length > 0) {
    return 0 - minusItems.reduceRight((a, x) => a += x)
  } else {
    return 0
  }
}

const assetsAccountsReducer = (state: AssetsAccountsStore = initialState, action: WithErrorsAction): AssetsAccountsStore => {
  switch (action.type) {
  case actionTypes.GET_ASSETS_ACCOUNTS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_ASSETS_ACCOUNTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      assetsAccounts: action.assetsAccounts,
      sum: calculateTotalAssets(action.assetsAccounts, action.currency)
    }
  case actionTypes.DELETE_ASSETS_ACCOUNT_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.DELETE_ASSETS_ACCOUNT_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.DELETE_ASSETS_ACCOUNT_FAILURE:
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

export default assetsAccountsReducer
