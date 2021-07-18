import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { TagsAction } from 'types/action'
import { Tag } from 'types/api'
import { catchErrors } from 'actions/errorsActions'
import { getCookiesFailure } from 'actions/userActions'

const getTagsRequest = (): Action => {
  return {
    type: actionTypes.GET_TAGS_REQUEST
  }
}

const getTagsSuccess = (tags: Tag[]): TagsAction => {
  return {
    type: actionTypes.GET_TAGS_SUCCESS,
    tags
  }
}

export const getTags = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getTagsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/tags', { headers: loginHeaders() })
        dispatch(getTagsSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
