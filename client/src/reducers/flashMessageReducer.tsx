import * as actionTypes from 'utils/actionTypes';
import { toast } from "react-toastify";

const initialState = {
  id: 0,
  message: '',
  messageType: '',
}

const flashMessageReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      toast('ログインしました');
      console.log('login');
      return {
        ...state,
        id: state.id + 1,
        message: 'ログインしました',
        messageType: 'success'
      }
    case actionTypes.LOGOUT_SUCCESS:
      toast('ログアウトしました');
      return {
        ...state,
        id: state.id + 1,
        message: 'ログアウトしました',
        messageType: 'success'
      }
    case actionTypes.SET_FLASH_MESSAGE_STYLE_CLASS:
      return {
        messageStyleClass: ' hide'
      }
    default:
      return state;
  }
}

export default flashMessageReducer;
