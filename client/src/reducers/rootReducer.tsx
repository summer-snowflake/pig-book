import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import categoryReducer from 'reducers/categoryReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  profile: profileReducer,
  category: categoryReducer
})

export default rootReducer;
