import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { Tutorial } from 'types/api'
import { TutorialAction } from 'types/action'
import { getCookiesFailure } from 'actions/userStatusActions'
import { catchErrors } from 'actions/errorsAction'

const getTutorialRequest = (): Action => {
  return {
    type: actionTypes.GET_TUTORIAL_REQUEST
  }
}

const getTutorialSuccess = (tutorial: Tutorial): TutorialAction => {
  return {
    type: actionTypes.GET_TUTORIAL_SUCCESS,
    tutorial
  }
}

export const getTutorial = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getTutorialRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/tutorial', { headers: loginHeaders() })
        dispatch(getTutorialSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
