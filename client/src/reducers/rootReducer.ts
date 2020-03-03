import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import newCategoryReducer from 'reducers/newCategoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import editCategoryReducer from 'reducers/editCategoryReducer'
import { SessionStore, UserStatusStore, ProfileStore, NewCategoryStore, CategoriesStore, EditCategoryStore } from 'types/store'

export type RootState = {
  session: SessionStore;
  userStatus: UserStatusStore;
  profile: ProfileStore;
  newCategory: NewCategoryStore;
  editCategory: EditCategoryStore;
  categories: CategoriesStore;
}

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  profile: profileReducer,
  newCategory: newCategoryReducer,
  editCategory: editCategoryReducer,
  categories: categoriesReducer
})

export default rootReducer
