import * as actionTypes from 'utils/actionTypes';

const initialState = {
  isLoading: false,
  isLogged: false
}

const userStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: false
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
        isLogged: true
      }
    case actionTypes.GET_USER_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLogged: false
      }
    default:
      return state;
  }
}

export default userStatusReducer;
