import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { NewPiggyBankStore } from 'types/store'
import { PiggyBankAction } from 'types/action'
import { PiggyBank } from 'types/api'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  isOpen: false,
  currency: 'yen',
  title: '',
  description: '',
  errors: []
}

interface StoreAction extends PiggyBankAction {
  piggyBank: PiggyBank;
  currency: string;
  title: string;
  description: string;
  errors: string[];
}

const newPiggyBankReducer = (state: NewPiggyBankStore = initialState, action: StoreAction): NewPiggyBankStore => {
  switch (action.type) {
  case actionTypes.OPEN_NEW_PIGGY_BANK_MODAL:
    return {
      ...initialState,
      currency: action.currency,
      isOpen: true
    }
  case actionTypes.CLOSE_NEW_PIGGY_BANK_MODAL:
    return {
      ...state,
      isOpen: false
    }
  case actionTypes.POST_PIGGY_BANK_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_PIGGY_BANK_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState,
      isOpen: false
    }
  case actionTypes.POST_PIGGY_BANK_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_NEW_PIGGY_BANK_TITLE:
    return {
      ...state,
      title: action.title
    }
  case actionTypes.CHANGE_NEW_PIGGY_BANK_DESCRIPTION:
    return {
      ...state,
      description: action.description
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

export default newPiggyBankReducer
