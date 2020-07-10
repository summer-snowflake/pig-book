import * as actionTypes from 'utils/actionTypes'
import { UserStatusStore } from 'types/store'
import { UserAction } from 'types/action'

const initialState = {
  isLoading: false,
  isLogged: false,
  admin: null,
  email: '',
  dailyOption: false,
  optionsList: '',
  options: []
}

const userStatusReducer = (state: UserStatusStore = initialState, action: UserAction): UserStatusStore => {
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
      dailyOption: action.user.daily_option,
      admin: action.user.admin,
      email: action.user.email,
      optionsList: action.user.options_list,
      options: action.user.options
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default userStatusReducer
