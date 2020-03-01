import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, CategoryAction } from 'types/action'
import { Category, CategoryParams, Errors } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'

interface WithBalanceOfPaymentsAction extends Action {
  balance_of_payments: boolean;
}

interface WithNameAction extends Action {
  name: string;
}

const postCategoryRequest = (): Action => {
  return {
    type: actionTypes.POST_CATEGORY_REQUEST
  }
}

const postCategorySuccess = (category: Category): CategoryAction => {
  return {
    type: actionTypes.POST_CATEGORY_SUCCESS,
    category
  }
}

const postCategoryFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_CATEGORY_FAILURE,
    errors
  }
}

export const postCategory = (params: CategoryParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postCategoryRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/categories', params, { headers: loginHeaders() })
        dispatch(postCategorySuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(postCategoryFailure(err.response.data.errors))
      }
      console.error(err)
    }
  }
}

export const changeCategoryBalanceOfPayments = (balance_of_payments: boolean): WithBalanceOfPaymentsAction => {
  return {
    type: actionTypes.CHANGE_CATEGORY_BALANCE_OF_PAYMENTS,
    balance_of_payments
  }
}

export const changeCategoryName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_CATEGORY_NAME,
    name
  }
}

const patchCategoryRequest = (): Action => {
  return {
    type: actionTypes.PATCH_CATEGORY_REQUEST
  }
}

const patchCategorySuccess = (): Action => {
  return {
    type: actionTypes.PATCH_CATEGORY_SUCCESS
  }
}

const patchCategoryFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_CATEGORY_FAILURE,
    errors
  }
}

export const patchCategory = (id: number, params: CategoryParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchCategoryRequest())

    try {
      if(ready()) {
        await axios.patch('/api/categories/' + id, params, { headers: loginHeaders() })
        dispatch(patchCategorySuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(patchCategoryFailure(err.response.data.errors))
      }
      console.error(err)
    }
  }
}
