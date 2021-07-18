import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Tag, TagParams } from 'types/api'

interface WithTagAction extends Action {
  tag: TagParams;
}

export const newTag = (tag: TagParams): WithTagAction => {
  return {
    type: actionTypes.NEW_TAG,
    tag
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

export const clearEditedTag = (): Action => {
  return {
    type: actionTypes.CLEAR_EDITED_TAG
  }
}
