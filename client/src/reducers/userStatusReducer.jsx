import * as actionTypes from 'utils/actionTypes';

const initialState = {
  isLoading: false,
  isLogged: false
}

const userStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_STATUS_REQUEST:
      return {
        isLoading: true,
        isLogged: false
      }
    case actionTypes.GET_USER_STATUS_SUCCESS:
      return {
        isLoading: false,
        isLogged: true
      }
    case actionTypes.GET_USER_STATUS_FAILURE:
      return {
        isLoading: false,
        isLogged: false
      }
    default:
      return state;
  }
}

export default userStatusReducer;
