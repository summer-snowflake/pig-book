import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { PiggyItem } from 'types/api'

interface WithPublishedOnAction extends Action {
  publishedOn: Date;
}

interface WithNameAction extends Action {
  name: string;
}

interface WithBalanceOfPaymentsAction extends Action {
  balanceOfPayments: boolean;
}

interface WithChargeAction extends Action {
  charge: string;
}

interface WithPiggyItemAction extends Action {
  piggyItem: PiggyItem;
}

export const changeNewPiggyItemPublishedOn = (publishedOn: Date): WithPublishedOnAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_ITEM_PUBLISHED_ON,
    publishedOn
  }
}

export const changeNewPiggyItemBalanceOfPayments = (balanceOfPayments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_ITEM_BALANCE_OF_PAYMENTS,
    balanceOfPayments
  }
}

export const changeNewPiggyItemName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_ITEM_NAME,
    name
  }
}

export const changeNewPiggyItemCharge = (charge: string): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_ITEM_CHARGE,
    charge
  }
}

export const changeEditPiggyItemPublishedOn = (publishedOn: Date): WithPublishedOnAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_ITEM_PUBLISHED_ON,
    publishedOn
  }
}

export const changeEditPiggyItemBalanceOfPayments = (balanceOfPayments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_ITEM_BALANCE_OF_PAYMENTS,
    balanceOfPayments
  }
}

export const changeEditPiggyItemName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_ITEM_NAME,
    name
  }
}

export const changeEditPiggyItemCharge = (charge: string): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_ITEM_CHARGE,
    charge
  }
}

export const openNewPiggyItemModal = (): Action => {
  return {
    type: actionTypes.OPEN_NEW_PIGGY_ITEM_MODAL
  }
}

export const closeNewPiggyItemModal = (): Action => {
  return {
    type: actionTypes.CLOSE_NEW_PIGGY_ITEM_MODAL
  }
}

export const openEditPiggyItemModal = (piggyItem: PiggyItem): WithPiggyItemAction => {
  return {
    type: actionTypes.OPEN_EDIT_PIGGY_ITEM_MODAL,
    piggyItem
  }
}

export const closeEditPiggyItemModal = (): Action => {
  return {
    type: actionTypes.CLOSE_EDIT_PIGGY_ITEM_MODAL
  }
}
