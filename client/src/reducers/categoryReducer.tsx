import React from 'react';
import * as actionTypes from 'utils/actionTypes';
import { toast } from 'react-toastify';

import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  balanceOfPayments: false,
  name: ''
}

interface Action {
  type: string,
  balanceOfPayments?: boolean,
  name: string
}

const categoryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.POST_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.POST_CATEGORY_SUCCESS:
      toast.success(<FlashMessage actionType={action.type} />);
      return {
        ...state,
        isLoading: false,
        name: ''
      }
    case actionTypes.POST_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.CHANGE_CATEGORY_BALANCE_OF_PAYMENTS:
      return {
        ...state,
        balanceOfPayments: action.balanceOfPayments
      }
    case actionTypes.CHANGE_CATEGORY_NAME:
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
}

export default categoryReducer;
