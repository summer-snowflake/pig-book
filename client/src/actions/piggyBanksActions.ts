import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { PiggyBanksAction } from 'types/action'
import { PiggyBank } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

const getPiggyBanksRequest = (): Action => {
  return {
    type: actionTypes.GET_PIGGY_BANKS_REQUEST
  }
}

const getPiggyBanksSuccess = (piggyBanks: PiggyBank[]): PiggyBanksAction => {
  return {
    type: actionTypes.GET_PIGGY_BANKS_SUCCESS,
    piggyBanks
  }
}

export const getPiggyBanks = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getPiggyBanksRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/piggy_banks', { headers: loginHeaders() })
        dispatch(getPiggyBanksSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
