import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { AssetsAccountAction } from 'types/action'
import { AssetsAccount } from 'types/api'

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

export const openDestroyAssetsAccountModal = (): Action => {
  return {
    type: actionTypes.OPEN_DESTROY_ASSETS_ACCOUNT_MODAL
  }
}

export const closeDestroyAssetsAccountModal = (): Action => {
  return {
    type: actionTypes.CLOSE_DESTROY_ASSETS_ACCOUNT_MODAL
  }
}
