import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'

interface WithEditingMemoAction extends Action {
  editingMemo: boolean;
}

export const setEditingMemo = (editingMemo: boolean): WithEditingMemoAction => {
  return {
    type: actionTypes.SET_EDITING_MEMO,
    editingMemo
  }
}
