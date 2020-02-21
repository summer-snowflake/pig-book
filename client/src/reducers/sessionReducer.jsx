import * as actionTypes from 'utils/actionTypes';

const initialState = {
  isLoading: false
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

export default sessionReducer;
