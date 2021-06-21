import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Record, Category, Tag } from 'types/api'

interface WithPublishedOnAction extends Action {
  publishedOn: Date;
}

interface WithCategoryAction extends Action {
  category: Category | undefined;
}

interface WithBalanceOfPaymentsAction extends Action {
  balance_of_payments: boolean;
}

interface WithBreakdownIdAction extends Action {
  breakdownId: number | undefined;
}

interface WithPlaceIdAction extends Action {
  placeId: number | undefined;
}

interface WithChargeAction extends Action {
  charge: number | string;
}

interface WithCashlessChargeAction extends Action {
  cashlessCharge: number | string;
}

interface WithPointAction extends Action {
  point: number | string;
}

interface WithMemoAction extends Action {
  memo: string;
}

interface WithRecordAction extends Action {
  record: Record;
}

interface WithTagAction extends Action {
  tag: Tag;
}

export const changePublishedOn = (publishedOn: Date): WithPublishedOnAction => {
  return {
    type: actionTypes.CHANGE_RECORD_PUBLISHED_ON,
    publishedOn
  }
}

export const changeBalanceOfPayments = (balance_of_payments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_RECORD_BALANCE_OF_PAYMENTS,
    balance_of_payments
  }
}

export const changeCategory = (category: Category | undefined): WithCategoryAction => {
  return {
    type: actionTypes.CHANGE_RECORD_CATEGORY,
    category
  }
}

export const changeBreakdown = (breakdownId: number | undefined): WithBreakdownIdAction => {
  return {
    type: actionTypes.CHANGE_RECORD_BREAKDOWN,
    breakdownId
  }
}

export const changePlace = (placeId: number | undefined): WithPlaceIdAction => {
  return {
    type: actionTypes.CHANGE_RECORD_PLACE,
    placeId
  }
}

export const changeCharge = (charge: number | string): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_RECORD_CHARGE,
    charge
  }
}

export const changeCashlessCharge = (cashlessCharge: number | string): WithCashlessChargeAction => {
  return {
    type: actionTypes.CHANGE_RECORD_CASHLESS_CHARGE,
    cashlessCharge
  }
}

export const changePoint = (point: number | string): WithPointAction => {
  return {
    type: actionTypes.CHANGE_RECORD_POINT,
    point
  }
}

export const changeMemo = (memo: string): WithMemoAction => {
  return {
    type: actionTypes.CHANGE_RECORD_MEMO,
    memo
  }
}

export const copyRecord = (record: Record): WithRecordAction => {
  return {
    type: actionTypes.COPY_RECORD,
    record
  }
}

export const closeNewModal = (): Action => {
  return {
    type: actionTypes.CLOSE_NEW_MODAL
  }
}

export const addNewRecordTag = (tag: Tag): WithTagAction => {
  return {
    type: actionTypes.ADD_NEW_RECORD_TAG,
    tag
  }
}

export const removeNewRecordTag = (tag: Tag): WithTagAction => {
  return {
    type: actionTypes.REMOVE_NEW_RECORD_TAG,
    tag
  }
}
