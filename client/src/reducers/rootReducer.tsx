import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import settingsReducer from 'reducers/settingsReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  settings: settingsReducer
})

export default rootReducer;
