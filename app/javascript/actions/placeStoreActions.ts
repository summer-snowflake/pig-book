import { Action } from 'redux'

import * as actionTypes from 'utils/actionTypes'
import { Place, PlaceParams } from 'types/api'

interface WithPlaceAction extends Action {
  place: PlaceParams;
}

export const newPlace = (place: PlaceParams): WithPlaceAction => {
  return {
    type: actionTypes.NEW_PLACE,
    place
  }
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
