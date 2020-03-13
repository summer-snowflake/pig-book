import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Errors, Category } from 'types/api'
import { NewRecordStore } from 'types/store'
import { RecordAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  editing: false,
  record: {
    charge: '',
    memo: '',
    category: {
      balance_of_payments: false
    }
  }
}

interface StoreAction extends RecordAction {
  category: Category;
  balance_of_payments: boolean;
  errors: Errors;
}

const newRecordReducer = (state: NewRecordStore = initialState, action: StoreAction): {} => {
  switch (action.type) {
  case actionTypes.POST_RECORD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.POST_RECORD_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      errors: []
    }
  case actionTypes.POST_RECORD_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_RECORD_CATEGORY:
    return {
      ...state,
      record: {
        charge: state.record.charge,
        memo: state.record.memo,
        category: action.category || {
          id: 0,
          balance_of_payments: state.record.category.balance_of_payments
        }
      }
    }
  case actionTypes.CHANGE_RECORD_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      record: {
        charge: state.record.charge,
        memo: state.record.memo,
        category: {
          id: 0,
          balance_of_payments: action.balance_of_payments
        }
      }
    }
  default:
    return state
  }
}

export default newRecordReducer
