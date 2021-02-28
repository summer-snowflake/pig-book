import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { EditPiggyItemStore } from 'types/store'
import { PiggyItemAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'
import { replaceFromCharge } from 'modules/replaceFromCharge'

const initialState = {
  isLoading: false,
  isOpen: false,
  id: 0,
  name: '',
  publishedOn: new Date(),
  balance_of_payments: false,
  charge: '',
  errors: []
}

interface StoreAction extends PiggyItemAction {
  //piggyBank: PiggyBank;
  id: string;
  name: string;
  publishedOn: Date;
  balanceOfPayments: boolean;
  charge: string;
  errors: string[];
}


const editPiggyItemReducer = (state: EditPiggyItemStore = initialState, action: StoreAction): EditPiggyItemStore => {
  switch (action.type) {
  case actionTypes.OPEN_EDIT_PIGGY_ITEM_MODAL:
    return {
      ...state,
      isOpen: true,
      id: action.piggyItem.id,
      name: action.piggyItem.name,
      publishedOn: new Date(action.piggyItem.published_on),
      balance_of_payments: action.piggyItem.balance_of_payments,
      charge: replaceFromCharge(action.piggyItem.charge)
    }
  case actionTypes.CLOSE_EDIT_PIGGY_ITEM_MODAL:
    return {
      ...initialState,
      isOpen: false,
    }
  case actionTypes.CHANGE_EDIT_PIGGY_ITEM_PUBLISHED_ON:
    return {
      ...state,
      publishedOn: action.publishedOn
    }
  case actionTypes.CHANGE_EDIT_PIGGY_ITEM_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      balance_of_payments: action.balanceOfPayments
    }
  case actionTypes.CHANGE_EDIT_PIGGY_ITEM_NAME:
    return {
      ...state,
      name: action.name
    }
  case actionTypes.CHANGE_EDIT_PIGGY_ITEM_CHARGE:
    return {
      ...state,
      charge: action.charge
    }
  case actionTypes.PATCH_PIGGY_ITEM_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.DELETE_PIGGY_ITEM_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.PATCH_PIGGY_ITEM_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      isOpen: false
    }
  case actionTypes.PATCH_PIGGY_ITEM_FAILURE:
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

export default editPiggyItemReducer
