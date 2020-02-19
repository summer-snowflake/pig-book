import * as actionTypes from 'utils/actionTypes';

const initialState = {
  isLoading: false
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        isLoading: false
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}

export default sessionReducer;
