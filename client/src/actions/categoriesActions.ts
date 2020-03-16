import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { CategoriesAction } from 'types/action'
import { Category } from 'types/api'

interface WithEditingIdAction extends Action {
  editingId: number;
}

const getCategoriesRequest = (): Action => {
  return {
    type: actionTypes.GET_CATEGORIES_REQUEST
  }
}

const getCategoriesSuccess = (categories: Category[]): CategoriesAction => {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    categories
  }
}

const getCategoriesFailure = (): Action => {
  return {
    type: actionTypes.GET_CATEGORIES_FAILURE
  }
}

export const getCategories = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getCategoriesRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/categories', { headers: loginHeaders() })
        dispatch(getCategoriesSuccess(res.data))
      } else {
        dispatch(getCategoriesFailure())
      }
    }
    catch (err) {
      console.error(err)
    }
  }
}
