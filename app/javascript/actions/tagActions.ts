import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, TagAction } from 'types/action'
import { Tag, TagParams, Errors } from 'types/api'
import { getCookiesFailure } from 'actions/userActions'
import { catchErrors } from 'actions/errorsActions'

interface WithTagAction extends Action {
  tag: Tag;
}

const postTagRequest = (): Action => {
  return {
    type: actionTypes.POST_TAG_REQUEST
  }
}

const postTagSuccess = (tag: Tag): TagAction => {
  return {
    type: actionTypes.POST_TAG_SUCCESS,
    tag
  }
}

const postTagFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_TAG_FAILURE,
    errors
  }
}

export const postTag = (params: TagParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postTagRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/tags', params, { headers: loginHeaders() })
        dispatch(postTagSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postTagFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchTagRequest = (): Action => {
  return {
    type: actionTypes.PATCH_TAG_REQUEST
  }
}

const patchTagSuccess = (tag: Tag): WithTagAction => {
  return {
    type: actionTypes.PATCH_TAG_SUCCESS,
    tag
  }
}

const patchTagFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_TAG_FAILURE,
    errors
  }
}

export const patchTag = (id: number, params: TagParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchTagRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/tags/' + id, params, { headers: loginHeaders() })
        dispatch(patchTagSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchTagFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deleteTagRequest = (): Action => {
  return {
    type: actionTypes.DELETE_TAG_REQUEST
  }
}

const deleteTagSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_TAG_SUCCESS
  }
}

const deleteTagFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_TAG_FAILURE,
    errors
  }
}

export const deleteTag = (tagId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deleteTagRequest())

    try {
      if(ready()) {
        await axios.delete('/api/tags/' + tagId, { headers: loginHeaders() })
        dispatch(deleteTagSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deleteTagFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
