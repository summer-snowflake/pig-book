import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'

interface WithMemoAction extends Action {
  memo: string;
}

export const changeMemo = (memo: string): WithMemoAction => {
  return {
    type: actionTypes.CHANGE_MEMO,
    memo
  }
}

export const openEditMemoModal = (): Action => {
  return {
    type: actionTypes.OPEN_EDIT_MEMO_MODAL
  }
}

export const closeEditMemoModal = (): Action => {
  return {
    type: actionTypes.CLOSE_EDIT_MEMO_MODAL
  }
}
