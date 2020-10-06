import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, AssetsAccountAction } from 'types/action'
import { AssetsAccount, AssetsAccountParams, Errors } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

interface WithBalanceOfPaymentsAction extends Action {
  balance_of_payments: boolean;
}

interface WithNameAction extends Action {
  name: string;
}

interface WithMoneyAction extends Action {
  money: string;
}

interface WithCurrencyAction extends Action {
  currency: string;
}

const postAssetsAccountRequest = (): Action => {
  return {
    type: actionTypes.POST_ASSETS_ACCOUNT_REQUEST
  }
}

const postAssetsAccountSuccess = (assetsAccount: AssetsAccount): AssetsAccountAction => {
  return {
    type: actionTypes.POST_ASSETS_ACCOUNT_SUCCESS,
    assetsAccount
  }
}

const postAssetsAccountFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_ASSETS_ACCOUNT_FAILURE,
    errors
  }
}

export const postAssetsAccount = (params: AssetsAccountParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postAssetsAccountRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/assets_accounts', params, { headers: loginHeaders() })
        dispatch(postAssetsAccountSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postAssetsAccountFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchAssetsAccountRequest = (): Action => {
  return {
    type: actionTypes.PATCH_ASSETS_ACCOUNT_REQUEST
  }
}

const patchAssetsAccountSuccess = (assetsAccount: AssetsAccount): AssetsAccountAction => {
  return {
    type: actionTypes.PATCH_ASSETS_ACCOUNT_SUCCESS,
    assetsAccount
  }
}

const patchAssetsAccountFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_ASSETS_ACCOUNT_FAILURE,
    errors
  }
}

export const patchAssetsAccount = (id: number, params: AssetsAccountParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchAssetsAccountRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/assets_accounts/' + id, params, { headers: loginHeaders() })
        dispatch(patchAssetsAccountSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchAssetsAccountFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deleteAssetsAccountRequest = (): Action => {
  return {
    type: actionTypes.DELETE_ASSETS_ACCOUNT_REQUEST
  }
}

const deleteAssetsAccountSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_ASSETS_ACCOUNT_SUCCESS
  }
}

const deleteAssetsAccountFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_ASSETS_ACCOUNT_FAILURE,
    errors
  }
}

export const deleteAssetsAccount = (assetsAccountId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deleteAssetsAccountRequest())

    try {
      if(ready()) {
        await axios.delete('/api/assets_accounts/' + assetsAccountId, { headers: loginHeaders() })
        dispatch(deleteAssetsAccountSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deleteAssetsAccountFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

export const changeAssetsAccountBalanceOfPayments = (balance_of_payments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_ASSETS_ACCOUNT_BALANCE_OF_PAYMENTS,
    balance_of_payments
  }
}

export const changeAssetsAccountName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_ASSETS_ACCOUNT_NAME,
    name
  }
}

export const changeAssetsAccountMoney = (money: string): WithMoneyAction => {
  return {
    type: actionTypes.CHANGE_ASSETS_ACCOUNT_MONEY,
    money
  }
}

export const openNewAssetsAccountModal = (currency: string): WithCurrencyAction => {
  return {
    type: actionTypes.OPEN_NEW_ASSETS_ACCOUNT_MODAL,
    currency
  }
}

export const closeNewAssetsAccountModal = (): Action => {
  return {
    type: actionTypes.CLOSE_NEW_ASSETS_ACCOUNT_MODAL
  }
}

export const openEditAssetsAccountModal = (assetsAccount: AssetsAccount): AssetsAccountAction => {
  return {
    type: actionTypes.OPEN_EDIT_ASSETS_ACCOUNT_MODAL,
    assetsAccount
  }
}

export const closeEditAssetsAccountModal = (): Action => {
  return {
    type: actionTypes.CLOSE_EDIT_ASSETS_ACCOUNT_MODAL
  }
}
