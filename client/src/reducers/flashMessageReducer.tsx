import * as actionTypes from 'utils/actionTypes';

const initialState = {
  message: '',
  messageType: ''
}

const flashMessageReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        message: 'ログインしました',
        messageType: 'success'
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        message: 'ログアウトしました',
        messageType: 'success'
      }
    default:
      return state;
  }
}

export default flashMessageReducer;
