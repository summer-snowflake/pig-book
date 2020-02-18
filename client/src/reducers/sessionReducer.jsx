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
    default:
      return state;
  }
}

export default sessionReducer;