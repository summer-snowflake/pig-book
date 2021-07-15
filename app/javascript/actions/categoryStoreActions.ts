import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, CategoryAction } from 'types/action'
import { Category, CategoryParams, Errors } from 'types/api'
import { catchErrors } from 'actions/errorsActions'
import { getCookiesFailure } from 'actions/userActions'

interface WithBalanceOfPaymentsAction extends Action {
  balance_of_payments: boolean;
}

interface WithNameAction extends Action {
  name: string;
}

interface WithCategoryAction extends Action {
  category: CategoryParams;
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
      if (err.response?.status === 422) {
        dispatch(postCategoryFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchCategoryRequest = (): Action => {
  return {
    type: actionTypes.PATCH_CATEGORY_REQUEST
  }
}

const patchCategorySuccess = (category: Category): CategoryAction => {
  return {
    type: actionTypes.PATCH_CATEGORY_SUCCESS,
    category
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
        const res = await axios.patch('/api/categories/' + id, params, { headers: loginHeaders() })
        dispatch(patchCategorySuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchCategoryFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deleteCategoryRequest = (): Action => {
  return {
    type: actionTypes.DELETE_CATEGORY_REQUEST
  }
}

const deleteCategorySuccess = (): Action => {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS
  }
}

const deleteCategoryFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_CATEGORY_FAILURE,
    errors
  }
}

export const deleteCategory = (categoryId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deleteCategoryRequest())

    try {
      if(ready()) {
        await axios.delete('/api/categories/' + categoryId, { headers: loginHeaders() })
        dispatch(deleteCategorySuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deleteCategoryFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const getCategoryRequest = (): Action => {
  return {
    type: actionTypes.GET_CATEGORY_REQUEST
  }
}

const getCategorySuccess = (category: Category): CategoryAction => {
  return {
    type: actionTypes.GET_CATEGORY_SUCCESS,
    category
  }
}

export const getCategory = (categoryId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getCategoryRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/categories/' + categoryId, { headers: loginHeaders() })
        dispatch(getCategorySuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

const getEditRecordCategoryRequest = (): Action => {
  return {
    type: actionTypes.GET_EDIT_RECORD_CATEGORY_REQUEST
  }
}

const getEditRecordCategorySuccess = (category: Category): CategoryAction => {
  return {
    type: actionTypes.GET_EDIT_RECORD_CATEGORY_SUCCESS,
    category
  }
}

export const getEditRecordCategory = (categoryId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getEditRecordCategoryRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/categories/' + categoryId, { headers: loginHeaders() })
        dispatch(getEditRecordCategorySuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

export const newCategory = (category: CategoryParams): WithCategoryAction => {
  return {
    type: actionTypes.NEW_CATEGORY,
    category
  }
}

export const editCategory = (category: CategoryParams): WithCategoryAction => {
  return {
    type: actionTypes.EDIT_CATEGORY,
    category
  }
}

export const exitCategory = (): Action => {
  return {
    type: actionTypes.EXIT_CATEGORY
  }
}

export const clearEditedCategory = (): Action => {
  return {
    type: actionTypes.CLEAR_EDITED_CATEGORY
  }
}
