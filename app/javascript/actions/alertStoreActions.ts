import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'

interface MessageTypeAction extends Action {
  messageType: string;
}

export const openAlertModal = (messageType: string): MessageTypeAction => {
  return {
    type: actionTypes.OPEN_ALERT_MODAL,
    messageType
  }
}

export const closeAlertModal = (): Action => {
  return {
    type: actionTypes.CLOSE_ALERT_MODAL
  }
}
