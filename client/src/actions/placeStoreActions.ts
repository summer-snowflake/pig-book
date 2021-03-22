import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Place } from 'types/api'

interface WithPlaceAction extends Action {
  place: Place;
}

export const editPlace = (place: Place): WithPlaceAction => {
  return {
    type: actionTypes.EDIT_PLACE,
    place
  }
}

export const exitPlace = (): Action => {
  return {
    type: actionTypes.EXIT_PLACE
  }
}

export const clearEditedPlace = (): Action => {
  return {
    type: actionTypes.CLEAR_EDITED_PLACE
  }
}
