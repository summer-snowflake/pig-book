import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'

interface WithLocaleAction extends Action {
  locale: string;
}

interface WithCurrencyAction extends Action {
  currency: string;
}

interface WithEditingAction extends Action {
  editing: boolean;
}

interface WithEditingMemoAction extends Action {
  editingMemo: boolean;
}

export const changeProfileLocale = (locale: string): WithLocaleAction => {
  return {
    type: actionTypes.CHANGE_PROFILE_LOCALE,
    locale: locale
  }
}

export const changeProfileCurrency = (currency: string): WithCurrencyAction => {
  return {
    type: actionTypes.CHANGE_PROFILE_CURRENCY,
    currency: currency
  }
}

export const setEditing = (editing: boolean): WithEditingAction => {
  return {
    type: actionTypes.SET_EDITING,
    editing
  }
}

export const setEditingMemo = (editingMemo: boolean): WithEditingMemoAction => {
  return {
    type: actionTypes.SET_EDITING_MEMO,
    editingMemo
  }
}
