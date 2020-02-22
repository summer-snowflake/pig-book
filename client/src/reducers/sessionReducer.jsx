import * as actionTypes from 'utils/actionTypes';
import { toast } from "react-toastify";

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
      toast('ログインしました');
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.LOGOUT_SUCCESS:
      toast('ログアウトしました');
      return {
        ...state
      }
    default:
      return state;
  }
}

export default sessionReducer;
