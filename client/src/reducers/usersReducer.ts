import * as actionTypes from 'utils/actionTypes'
import { UsersAction } from 'types/action'
import { UsersStore } from 'types/store'

const initialState = {
  isLoading: false,
  users: []
}

const usersReducer = (state: UsersStore = initialState, action: UsersAction): {} => {
  switch (action.type) {
  case actionTypes.GET_USERS_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_USERS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      users: action.users
    }
  case actionTypes.GET_USERS_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default usersReducer
