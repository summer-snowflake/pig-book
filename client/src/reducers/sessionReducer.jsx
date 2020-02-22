import React from 'react';
import * as actionTypes from 'utils/actionTypes';
import { toast } from 'react-toastify';

import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      toast.success(<FlashMessage message='ログインしました' messageType='success' />);
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILURE:
      toast.error(<FlashMessage message='ログインに失敗しました' messageType='error' />);
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.LOGOUT_SUCCESS:
      toast.success(<FlashMessage message='ログアウトしました' messageType='success' />);
      return {
        ...state
      }
    default:
      return state;
  }
}

export default sessionReducer;
