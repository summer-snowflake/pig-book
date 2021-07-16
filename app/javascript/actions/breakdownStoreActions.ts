import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { BreakdownAction } from 'types/action'
import { Breakdown } from 'types/api'

export const newBreakdown = (breakdown: Breakdown): BreakdownAction => {
  return {
    type: actionTypes.NEW_BREAKDOWN,
    breakdown
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
