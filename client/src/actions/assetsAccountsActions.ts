import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { AssetsAccountsAction } from 'types/action'
import { AssetsAccount } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

const getAssetsAccountsRequest = (): Action => {
  return {
    type: actionTypes.GET_ASSETS_ACCOUNTS_REQUEST
  }
}

const getAssetsAccountsSuccess = (assetsAccounts: AssetsAccount[], currency: string): AssetsAccountsAction => {
  return {
    type: actionTypes.GET_ASSETS_ACCOUNTS_SUCCESS,
    assetsAccounts,
    currency
  }
}

export const getAssetsAccounts = (currency: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getAssetsAccountsRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/assets_accounts', { headers: loginHeaders() })
        dispatch(getAssetsAccountsSuccess(res.data, currency))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}
