import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  loginStatus: userStatusReducer
})

export default rootReducer;
