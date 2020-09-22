import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { AssetsAccountsStore } from 'types/store'
import { AssetsAccountsAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  assetsAccounts: [],
  errors: []
}

interface WithErrorsAction extends AssetsAccountsAction {
  errors: string[];
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
      assetsAccounts: action.assetsAccounts
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
