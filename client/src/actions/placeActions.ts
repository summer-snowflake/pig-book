import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, PlaceAction, CategoriesAction } from 'types/action'
import { Place, PlaceParams, Errors, Category } from 'types/api'
import { getCookiesFailure } from 'actions/userStatusActions'
import { catchErrors } from 'actions/errorsAction'

interface WithNameAction extends Action {
  name: string;
}

interface WithPlaceAction extends Action {
  place: Place;
}

interface WithPlaceCategoriesAction extends Action {
  placeId: number;
  categories: Category[];
}

const postPlaceRequest = (): Action => {
  return {
    type: actionTypes.POST_PLACE_REQUEST
  }
}

const postPlaceSuccess = (place: Place): PlaceAction => {
  return {
    type: actionTypes.POST_PLACE_SUCCESS,
    place
  }
}

const postPlaceFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_PLACE_FAILURE,
    errors
  }
}

export const postPlace = (params: PlaceParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postPlaceRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/places', params, { headers: loginHeaders() })
        dispatch(postPlaceSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postPlaceFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

export const changePlaceName = (name: string): WithNameAction => {
  return {
    type: actionTypes.CHANGE_PLACE_NAME,
    name
  }
}

const patchPlaceRequest = (): Action => {
  return {
    type: actionTypes.PATCH_PLACE_REQUEST
  }
}

const patchPlaceSuccess = (place: Place): WithPlaceAction => {
  return {
    type: actionTypes.PATCH_PLACE_SUCCESS,
    place
  }
}

const patchPlaceFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_PLACE_FAILURE,
    errors
  }
}

export const patchPlace = (id: number, params: PlaceParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchPlaceRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/places/' + id, params, { headers: loginHeaders() })
        dispatch(patchPlaceSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchPlaceFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deletePlaceRequest = (): Action => {
  return {
    type: actionTypes.DELETE_PLACE_REQUEST
  }
}

const deletePlaceSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_PLACE_SUCCESS
  }
}

const deletePlaceFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_PLACE_FAILURE,
    errors
  }
}

export const deletePlace = (placeId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deletePlaceRequest())

    try {
      if(ready()) {
        await axios.delete('/api/places/' + placeId, { headers: loginHeaders() })
        dispatch(deletePlaceSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deletePlaceFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const getPlaceCategoriesRequest = (): Action => {
  return {
    type: actionTypes.GET_PLACE_CATEGORIES_REQUEST
  }
}

const getPlaceCategoriesSuccess = (categories: Category[]): CategoriesAction => {
  return {
    type: actionTypes.GET_PLACE_CATEGORIES_SUCCESS,
    categories
  }
}

export const getPlaceCategories = (placeId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getPlaceCategoriesRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/places/' + placeId + '/categories', { headers: loginHeaders() })
        dispatch(getPlaceCategoriesSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

const postPlaceCategoriesRequest = (): Action => {
  return {
    type: actionTypes.POST_PLACE_CATEGORIES_REQUEST
  }
}

const postPlaceCategoriesSuccess = (placeId: number, categories: Category[]): WithPlaceCategoriesAction => {
  return {
    type: actionTypes.POST_PLACE_CATEGORIES_SUCCESS,
    placeId,
    categories
  }
}

export const postPlaceCategories = (placeId: number, categoryIds: number[]) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postPlaceCategoriesRequest())
    try {
      if(ready()) {
        const params = {
          category_ids: categoryIds
        }
        const res = await axios.post('/api/places/' + placeId + '/categories', params, { headers: loginHeaders() })
        dispatch(postPlaceCategoriesSuccess(placeId, res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
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
