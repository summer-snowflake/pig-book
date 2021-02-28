import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, PiggyItemAction } from 'types/action'
import { Errors, PiggyItem, PiggyItemParams } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

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

const postPiggyItemRequest = (): Action => {
  return {
    type: actionTypes.POST_PIGGY_ITEM_REQUEST
  }
}

const postPiggyItemSuccess = (piggyItem: PiggyItem): PiggyItemAction => {
  return {
    type: actionTypes.POST_PIGGY_ITEM_SUCCESS,
    piggyItem
  }
}

const postPiggyItemFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_PIGGY_ITEM_FAILURE,
    errors
  }
}

export const postPiggyItem = (piggyBankId: number, params: PiggyItemParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postPiggyItemRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/piggy_banks/' + piggyBankId + '/piggy_items', params, { headers: loginHeaders() })
        dispatch(postPiggyItemSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postPiggyItemFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchPiggyItemRequest = (): Action => {
  return {
    type: actionTypes.PATCH_PIGGY_ITEM_REQUEST
  }
}

const patchPiggyItemSuccess = (piggyItem: PiggyItem): PiggyItemAction => {
  return {
    type: actionTypes.PATCH_PIGGY_ITEM_SUCCESS,
    piggyItem
  }
}

const patchPiggyItemFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_PIGGY_ITEM_FAILURE,
    errors
  }
}

export const patchPiggyItem = (id: number, piggyItemId: number, params: PiggyItemParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchPiggyItemRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/piggy_banks/' + id + '/piggy_items/' + piggyItemId, params, { headers: loginHeaders() })
        dispatch(patchPiggyItemSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchPiggyItemFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deletePiggyItemRequest = (): Action => {
  return {
    type: actionTypes.DELETE_PIGGY_ITEM_REQUEST
  }
}

const deletePiggyItemSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_PIGGY_ITEM_SUCCESS
  }
}

const deletePiggyItemFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_PIGGY_ITEM_FAILURE,
    errors
  }
}

export const deletePiggyItem = (piggyBankId: number, piggyItemId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deletePiggyItemRequest())

    try {
      if(ready()) {
        await axios.delete('/api/piggy_banks/' + piggyBankId + '/piggy_items/' + piggyItemId, { headers: loginHeaders() })
        dispatch(deletePiggyItemSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deletePiggyItemFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}


export const changePiggyItemPublishedOn = (publishedOn: Date): WithPublishedOnAction => {
  return {
    type: actionTypes.CHANGE_PIGGY_ITEM_PUBLISHED_ON,
    publishedOn
  }
}

export const changePiggyItemBalanceOfPayments = (balanceOfPayments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_PIGGY_ITEM_BALANCE_OF_PAYMENTS,
    balanceOfPayments
  }
}

export const changePiggyItemName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_PIGGY_ITEM_NAME,
    name
  }
}

export const changePiggyItemCharge = (charge: string): WithChargeAction => {
  return {
    type: actionTypes.CHANGE_PIGGY_ITEM_CHARGE,
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

//const getPiggyBankRequest = (): Action => {
//  return {
//    type: actionTypes.GET_PIGGY_BANK_REQUEST
//  }
//}
//
//const getPiggyBankSuccess = (piggyBank: PiggyBank): PiggyBankAction => {
//  return {
//    type: actionTypes.GET_PIGGY_BANK_SUCCESS,
//    piggyBank
//  }
//}
//
//export const getPiggyBank = (piggyBankId: number) => {
//  return async (dispatch: Dispatch<Action>): Promise<void> => {
//    dispatch(getPiggyBankRequest())
//    try {
//      if(ready()) {
//        const res = await axios.get('/api/piggy_banks/' + piggyBankId, { headers: loginHeaders() })
//        dispatch(getPiggyBankSuccess(res.data))
//      } else {
//        dispatch(getCookiesFailure())
//      }
//    }
//    catch (err) {
//      dispatch(catchErrors(err.response))
//    }
//  }
//}
//