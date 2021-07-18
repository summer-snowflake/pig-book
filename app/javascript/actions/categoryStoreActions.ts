import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { CategoryParams } from 'types/api'

interface WithCategoryAction extends Action {
  category: CategoryParams;
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
