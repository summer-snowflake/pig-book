import { combineReducers } from 'redux'

import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import newCategoryReducer from 'reducers/newCategoryReducer'
import editCategoryReducer from 'reducers/editCategoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import breakdownsReducer from './breakdownsReducer'
import newBreakdownReducer from './newBreakdownReducer'
import editBreakdownReducer from './editBreakdownReducer'
import { SessionStore, UserStatusStore, ProfileStore, NewCategoryStore, CategoriesStore, EditCategoryStore, BreakdownsStore, EditBreakdownStore, NewBreakdownStore } from 'types/store'

export type RootState = {
  session: SessionStore;
  userStatus: UserStatusStore;
  profile: ProfileStore;
  newCategory: NewCategoryStore;
  editCategory: EditCategoryStore;
  categories: CategoriesStore;
  breakdowns: BreakdownsStore;
  newBreakdown: NewBreakdownStore;
  editBreakdown: EditBreakdownStore;
}

const rootReducer = combineReducers({
  session: sessionReducer,
  userStatus: userStatusReducer,
  profile: profileReducer,
  newCategory: newCategoryReducer,
  editCategory: editCategoryReducer,
  categories: categoriesReducer,
  breakdowns: breakdownsReducer,
  newBreakdown: newBreakdownReducer,
  editBreakdown: editBreakdownReducer
})

export default rootReducer
