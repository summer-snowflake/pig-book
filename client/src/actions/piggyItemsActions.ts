import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { PiggyItemsAction } from 'types/action'
import { PiggyItem } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

const getPiggyItemsRequest = (): Action => {
  return {
    type: actionTypes.GET_PIGGY_ITEMS_REQUEST
  }
}

const getPiggyItemsSuccess = (piggyItems: PiggyItem[]): PiggyItemsAction => {
  return {
    type: actionTypes.GET_PIGGY_ITEMS_SUCCESS,
    piggyItems
  }
}

export const getPiggyItems = (piggyBankId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getPiggyItemsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/piggy_banks/' + piggyBankId + '/piggy_items', { headers: loginHeaders() })
        dispatch(getPiggyItemsSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
