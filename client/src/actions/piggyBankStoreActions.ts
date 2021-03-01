import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { PiggyBankAction } from 'types/action'
import { PiggyBank } from 'types/api'

interface WithCurrencyAction extends Action {
  currency: string;
}

interface WithTitleAction extends Action {
  title: string;
}

interface WithDescriptionAction extends Action {
  description: string;
}

export const changeNewPiggyBankTitle = (title: string): WithTitleAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_BANK_TITLE,
    title
  }
}

export const changeNewPiggyBankDescription = (description: string): WithDescriptionAction => {
  return {
    type: actionTypes.CHANGE_NEW_PIGGY_BANK_DESCRIPTION,
    description
  }
}

export const changeEditPiggyBankTitle = (title: string): WithTitleAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_BANK_TITLE,
    title
  }
}

export const changeEditPiggyBankDescription = (description: string): WithDescriptionAction => {
  return {
    type: actionTypes.CHANGE_EDIT_PIGGY_BANK_DESCRIPTION,
    description
  }
}

export const openNewPiggyBankModal = (currency: string): WithCurrencyAction => {
  return {
    type: actionTypes.OPEN_NEW_PIGGY_BANK_MODAL,
    currency
  }
}

export const closeNewPiggyBankModal = (): Action => {
  return {
    type: actionTypes.CLOSE_NEW_PIGGY_BANK_MODAL
  }
}

export const openEditPiggyBankField = (piggyBank: PiggyBank): PiggyBankAction => {
  return {
    type: actionTypes.OPEN_EDIT_PIGGY_BANK_FIELD,
    piggyBank
  }
}

export const closeEditPiggyBankField = (): Action => {
  return {
    type: actionTypes.CLOSE_EDIT_PIGGY_BANK_FIELD
  }
}
