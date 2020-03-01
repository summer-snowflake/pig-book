import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import categoryReducer from 'reducers/categoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import editCategoryReducer from './editCategoryReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  profile: profileReducer,
  category: categoryReducer,
  editCategory: editCategoryReducer,
  categories: categoriesReducer
})

export default rootReducer
