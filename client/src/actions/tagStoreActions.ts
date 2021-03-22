import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Tag } from 'types/api'

interface WithColorCodeAction extends Action {
  color: string;
}

interface WithNameAction extends Action {
  name: string;
}

interface WithTagAction extends Action {
  tag: Tag;
}

export const changeTagColorCode = (color: string): WithColorCodeAction => {
  return {
    type: actionTypes.CHANGE_TAG_COLOR_CODE,
    color
  }
}

export const changeTagName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_TAG_NAME,
    name
  }
}

export const editTag = (tag: Tag): WithTagAction => {
  return {
    type: actionTypes.EDIT_TAG,
    tag
  }
}

export const exitTag = (): Action => {
  return {
    type: actionTypes.EXIT_TAG
  }
}
