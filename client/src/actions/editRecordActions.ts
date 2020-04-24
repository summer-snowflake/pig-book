import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, RecordAction } from 'types/action'
import { Record, Errors, RecordParams, Category } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'
import { catchErrors } from 'actions/errorsAction'

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
  charge: number;
}

interface WithCashlessChargeAction extends Action {
  cashlessCharge: number;
}

interface WithPointAction extends Action {
  point: number;
}

interface WithMemoAction extends Action {
  memo: string;
}

interface WithRecordAction extends Action {
  record: Record;
}

const patchRecordRequest = (): Action => {
  return {
    type: actionTypes.PATCH_RECORD_REQUEST
  }
}

const patchRecordSuccess = (record: Record): RecordAction => {
  return {
    type: actionTypes.PATCH_RECORD_SUCCESS,
    record
  }
}

const patchRecordFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.PATCH_RECORD_FAILURE,
    errors
  }
}

export const patchRecord = (recordId: number, params: RecordParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchRecordRequest())
    try {
      if(ready()) {
        const res = await axios.patch('/api/records/' + recordId, params, { headers: loginHeaders() })
        dispatch(patchRecordSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchRecordFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

export const clearEditedRecord = (): Action => {
  return {
    type: actionTypes.CLEAR_EDITED_RECORD
  }
}

export const changePublishedOn = (publishedOn: Date): WithPublishedOnAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_PUBLISHED_ON,
    publishedOn
  }
}

export const changeBalanceOfPayments = (balance_of_payments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_BALANCE_OF_PAYMENTS,
    balance_of_payments
  }
}

export const changeCategory = (category: Category | undefined): WithCategoryAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_CATEGORY,
    category
  }
}

export const changeBreakdown = (breakdownId: number | undefined): WithBreakdownIdAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_BREAKDOWN,
    breakdownId
  }
}

export const changePlace = (placeId: number | undefined): WithPlaceIdAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_PLACE,
    placeId
  }
}

export const changeCharge = (charge: number): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_CHARGE,
    charge
  }
}

export const changeCashlessCharge = (cashlessCharge: number): WithCashlessChargeAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_CASHLESS_CHARGE,
    cashlessCharge
  }
}

export const changePoint = (point: number): WithPointAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_POINT,
    point
  }
}

export const changeMemo = (memo: string): WithMemoAction => {
  return {
    type: actionTypes.CHANGE_EDIT_RECORD_MEMO,
    memo
  }
}

export const editRecord = (record: Record): WithRecordAction => {
  return {
    type: actionTypes.EDIT_RECORD,
    record
  }
}

export const closeEditModal = (): Action => {
  return {
    type: actionTypes.CLOSE_EDIT_MODAL
  }
}
