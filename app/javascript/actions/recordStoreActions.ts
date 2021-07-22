import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Record } from 'types/api'

interface withRecordAction extends Action {
  record: Record;
}

export const newRecord = (record: Record): withRecordAction => {
  return {
    type: actionTypes.NEW_RECORD,
    record
  }
}
