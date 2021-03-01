import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, PiggyItemAction } from 'types/action'
import { Errors, PiggyItem, PiggyItemParams } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

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
