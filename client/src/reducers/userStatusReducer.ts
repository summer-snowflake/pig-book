import * as actionTypes from 'utils/actionTypes'
import { UserStatusStore } from 'types/store'
import { UserAction } from 'types/action'

const initialState = {
  isLoading: false,
  isLogged: false,
  admin: null
}

const userStatusReducer = (state: UserStatusStore = initialState, action: UserAction): {} => {
  switch (action.type) {
  case actionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLogged: true
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_USER_STATUS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLogged: false
    }
  case actionTypes.GET_USER_STATUS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLogged: true,
      admin: action.user.admin
    }
  case actionTypes.GET_USER_STATUS_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLogged: false
    }
  default:
    return state
  }
}

export default userStatusReducer
