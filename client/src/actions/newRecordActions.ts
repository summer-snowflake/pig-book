import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, RecordAction } from 'types/action'
import { Record, Errors, RecordParams, Category } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'

interface WithDateAction extends Action {
  date: Date;
}

interface WithCategoryAction extends Action {
  category: Category | undefined;
}

interface WithBalanceOfPaymentsAction extends Action {
  balance_of_payments: boolean;
}

interface WithBreakdownIdAction extends Action {
  breakdownId: number;
}

interface WithPlaceIdAction extends Action {
  placeId: number;
}

interface WithChargeAction extends Action {
  charge: number;
}

interface WithMemoAction extends Action {
  memo: string;
}

const postRecordRequest = (): Action => {
  return {
    type: actionTypes.POST_RECORD_REQUEST
  }
}

const postRecordSuccess = (record: Record): RecordAction => {
  return {
    type: actionTypes.POST_RECORD_SUCCESS,
    record
  }
}

const postRecordFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_RECORD_FAILURE,
    errors
  }
}

export const postRecord = (params: RecordParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postRecordRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/records', params, { headers: loginHeaders() })
        dispatch(postRecordSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(postRecordFailure(err.response.data.errors))
      }
      console.error(err)
    }
  }
}

export const changePublishedOn = (date: Date): WithDateAction => {
  return {
    type: actionTypes.CHANGE_RECORD_PUBLISHED_ON,
    date
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

export const changeBreakdown = (breakdownId: number): WithBreakdownIdAction => {
  return {
    type: actionTypes.CHANGE_RECORD_BREAKDOWN,
    breakdownId
  }
}

export const changePlace = (placeId: number): WithPlaceIdAction => {
  return {
    type: actionTypes.CHANGE_RECORD_PLACE,
    placeId
  }
}

export const changeCharge = (charge: number): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_RECORD_CHARGE,
    charge
  }
}

export const changeMemo = (memo: string): WithMemoAction => {
  return {
    type: actionTypes.CHANGE_RECORD_MEMO,
    memo
  }
}
