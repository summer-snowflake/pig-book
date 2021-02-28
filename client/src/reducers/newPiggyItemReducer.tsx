import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { NewPiggyItemStore } from 'types/store'
import { PiggyItemAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  isOpen: false,
  publishedOn: new Date(),
  balance_of_payments: false,
  charge: '',
  name: '',
  errors: []
}

interface StoreAction extends PiggyItemAction {
  publishedOn: Date;
  balanceOfPayments: boolean;
  name: string;
  charge: string;
  errors: string[];
}

const newPiggyItemReducer = (state: NewPiggyItemStore = initialState, action: StoreAction): NewPiggyItemStore => {
  switch (action.type) {
  case actionTypes.OPEN_NEW_PIGGY_ITEM_MODAL:
    return {
      ...initialState,
      isOpen: true
    }
  case actionTypes.CLOSE_NEW_PIGGY_ITEM_MODAL:
    return {
      ...state,
      isOpen: false
    }
  case actionTypes.CHANGE_PIGGY_ITEM_PUBLISHED_ON:
    return {
      ...state,
      publishedOn: action.publishedOn
    }
  case actionTypes.CHANGE_PIGGY_ITEM_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      balance_of_payments: action.balanceOfPayments
    }
  case actionTypes.CHANGE_PIGGY_ITEM_NAME:
    return {
      ...state,
      name: action.name
    }
  case actionTypes.CHANGE_PIGGY_ITEM_CHARGE:
    return {
      ...state,
      charge: action.charge
    }
  case actionTypes.POST_PIGGY_ITEM_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_PIGGY_ITEM_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...initialState,
      isLoading: false,
      isOpen: false
    }
  case actionTypes.POST_PIGGY_ITEM_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
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

export default newPiggyItemReducer
