import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer';
import userStatusReducer from 'reducers/userStatusReducer';
import messageReducer from 'reducers/flashMessageReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  flashMessage: messageReducer
})

export default rootReducer;
