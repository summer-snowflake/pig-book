import * as actionTypes from 'utils/actionTypes'
import { UsersAction } from 'types/action'
import { UsersStore } from 'types/store'

const initialState = {
  isLoading: false,
  users: [],
  page: 1,
  maxPage: 1
}

const usersReducer = (state: UsersStore = initialState, action: UsersAction): UsersStore => {
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
      users: action.users,
      page: action.page,
      maxPage: action.max_page
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default usersReducer
