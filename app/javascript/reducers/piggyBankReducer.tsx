import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { PiggyBankStore } from 'types/store'
import { PiggyBankAction } from 'types/action'
import FlashMessage from 'components/common/FlashMessage'

const initialState = {
  isLoading: false,
  editing: false,
  piggyBank: null,
  errors: []
}

interface WithErrorsAction extends PiggyBankAction {
  errors: string[];
}

const piggyBankReducer = (state: PiggyBankStore = initialState, action: WithErrorsAction): PiggyBankStore => {
  switch (action.type) {
  case actionTypes.GET_PIGGY_BANK_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_PIGGY_BANK_SUCCESS:
    return {
      ...state,
      isLoading: false,
      piggyBank: action.piggyBank
    }
  case actionTypes.OPEN_EDIT_PIGGY_BANK_FIELD:
    return {
      ...state,
      editing: true
    }
  case actionTypes.CLOSE_EDIT_PIGGY_BANK_FIELD:
    return {
      ...state,
      editing: false
    }
  case actionTypes.PATCH_PIGGY_BANK_SUCCESS:
    return {
      ...state,
      editing: false,
      piggyBank: action.piggyBank
    }
  case actionTypes.DELETE_PIGGY_BANK_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState
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

export default piggyBankReducer
