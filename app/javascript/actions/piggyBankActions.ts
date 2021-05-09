import { Dispatch } from 'react'
import { Action } from 'redux'

import { setting as axios } from 'config/axios'
import * as actionTypes from 'utils/actionTypes'
import { ready, loginHeaders } from 'utils/cookies'
import { ErrorsAction, PiggyBankAction } from 'types/action'
import { Errors, PiggyBank, PiggyBankParams } from 'types/api'
import { catchErrors } from 'actions/errorsAction'
import { getCookiesFailure } from 'actions/userActions'

const getPiggyBankRequest = (): Action => {
  return {
    type: actionTypes.GET_PIGGY_BANK_REQUEST
  }
}

const getPiggyBankSuccess = (piggyBank: PiggyBank): PiggyBankAction => {
  return {
    type: actionTypes.GET_PIGGY_BANK_SUCCESS,
    piggyBank
  }
}

export const getPiggyBank = (piggyBankId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(getPiggyBankRequest())
    try {
      if(ready()) {
        const res = await axios.get('/api/piggy_banks/' + piggyBankId, { headers: loginHeaders() })
        dispatch(getPiggyBankSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      dispatch(catchErrors(err.response))
    }
  }
}

const postPiggyBankRequest = (): Action => {
  return {
    type: actionTypes.POST_PIGGY_BANK_REQUEST
  }
}

const postPiggyBankSuccess = (piggyBank: PiggyBank): PiggyBankAction => {
  return {
    type: actionTypes.POST_PIGGY_BANK_SUCCESS,
    piggyBank
  }
}

const postPiggyBankFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.POST_PIGGY_BANK_FAILURE,
    errors
  }
}

export const postPiggyBank = (params: PiggyBankParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(postPiggyBankRequest())
    try {
      if(ready()) {
        const res = await axios.post('/api/piggy_banks', params, { headers: loginHeaders() })
        dispatch(postPiggyBankSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(postPiggyBankFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const patchPiggyBankRequest = (): Action => {
  return {
    type: actionTypes.PATCH_PIGGY_BANK_REQUEST
  }
}

const patchPiggyBankSuccess = (piggyBank: PiggyBank): PiggyBankAction => {
  return {
    type: actionTypes.PATCH_PIGGY_BANK_SUCCESS,
    piggyBank
  }
}

const patchPiggyBankFailure = (errors: Error): ErrorsAction => {
  return {
    type: actionTypes.PATCH_PIGGY_BANK_FAILURE,
    errors
  }
}

export const patchPiggyBank = (id: number, params: PiggyBankParams) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(patchPiggyBankRequest())

    try {
      if(ready()) {
        const res = await axios.patch('/api/piggy_banks/' + id, params, { headers: loginHeaders() })
        dispatch(patchPiggyBankSuccess(res.data))
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 422) {
        dispatch(patchPiggyBankFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}

const deletePiggyBankRequest = (): Action => {
  return {
    type: actionTypes.DELETE_PIGGY_BANK_REQUEST
  }
}

const deletePiggyBankSuccess = (): Action => {
  return {
    type: actionTypes.DELETE_PIGGY_BANK_SUCCESS
  }
}

const deletePiggyBankFailure = (errors: Errors): ErrorsAction => {
  return {
    type: actionTypes.DELETE_PIGGY_BANK_FAILURE,
    errors
  }
}

export const deletePiggyBank = (piggyBankId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(deletePiggyBankRequest())

    try {
      if(ready()) {
        await axios.delete('/api/piggy_banks/' + piggyBankId, { headers: loginHeaders() })
        dispatch(deletePiggyBankSuccess())
      } else {
        dispatch(getCookiesFailure())
      }
    }
    catch (err) {
      if (err.response?.status === 403) {
        dispatch(deletePiggyBankFailure(err.response.data.errors))
      } else {
        dispatch(catchErrors(err.response))
      }
    }
  }
}
