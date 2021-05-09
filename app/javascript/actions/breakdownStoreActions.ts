import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { BreakdownAction } from 'types/action'
import { Category, Breakdown } from 'types/api'

interface WithNameAction extends Action {
  name: string;
}

interface WithCategoryAction extends Action {
  category: Category | undefined;
}

export const changeBreakdownName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_BREAKDOWN_NAME,
    name
  }
}

export const changeCategory = (category: Category | undefined): WithCategoryAction => {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    category
  }
}

export const editBreakdown = (breakdown: Breakdown): BreakdownAction => {
  return {
    type: actionTypes.EDIT_BREAKDOWN,
    breakdown
  }
}

export const exitBreakdown = (): Action => {
  return {
    type: actionTypes.EXIT_BREAKDOWN
  }
}

export const clearEditedBreakdown = (): Action => {
  return {
    type: actionTypes.CLEAR_EDITED_BREAKDOWN
  }
}
