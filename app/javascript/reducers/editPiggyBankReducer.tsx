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
  id: string;
  title: string;
  description: string;
  errors: string[];
}

const editPiggyBankReducer = (state: NewPiggyBankStore = initialState, action: StoreAction): NewPiggyBankStore => {
  switch (action.type) {
  case actionTypes.OPEN_EDIT_PIGGY_BANK_FIELD:
    return {
      ...initialState,
      id: action.piggyBank.id,
      currency: action.piggyBank.currency,
      title: action.piggyBank.title,
      description: action.piggyBank.description
    }
  case actionTypes.PATCH_PIGGY_BANK_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_PIGGY_BANK_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state
    }
  case actionTypes.CHANGE_EDIT_PIGGY_BANK_TITLE:
    return {
      ...state,
      title: action.title
    }
  case actionTypes.CHANGE_EDIT_PIGGY_BANK_DESCRIPTION:
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

export default editPiggyBankReducer
