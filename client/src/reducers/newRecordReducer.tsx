import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { Errors, WithRelationsCategory } from 'types/api'
import { NewRecordStore } from 'types/store'
import { RecordAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  editing: false,
  record: {
    published_on: new Date(),
    charge: '',
    memo: '',
    category: {
      balance_of_payments: false
    }
  },
  breakdowns: []
}

interface StoreAction extends RecordAction {
  category: WithRelationsCategory;
  balance_of_payments: boolean;
  date: Date;
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
        published_on: state.record.published_on,
        charge: state.record.charge,
        memo: state.record.memo,
        category: action.category || {
          id: 0,
          balance_of_payments: state.record.category.balance_of_payments
        },
        breakdown_id: 0
      }
    }
  case actionTypes.CHANGE_RECORD_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      record: {
        published_on: state.record.published_on,
        charge: state.record.charge,
        memo: state.record.memo,
        category: {
          id: 0,
          balance_of_payments: action.balance_of_payments
        },
        breakdown_id: 0
      }
    }
  case actionTypes.CHANGE_RECORD_PUBLISHED_ON:
    return {
      ...state,
      record: {
        published_on: action.date,
        charge: state.record.charge,
        memo: state.record.memo,
        category: state.record.category,
        breakdown_id: state.record.breakdown_id
      }
    }
  case actionTypes.CHANGE_RECORD_BREAKDOWN:
    return {
      ...state,
      record: {
        published_on: state.record.published_on,
        charge: state.record.charge,
        memo: state.record.memo,
        category: state.record.category,
        breakdown_id: state.record.breakdown_id
      }
    }
  case actionTypes.GET_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_CATEGORY_SUCCESS:
    return {
      ...state,
      isLoading: false,
      breakdowns: action.category.breakdowns
    }
  case actionTypes.GET_CATEGORY_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default newRecordReducer
