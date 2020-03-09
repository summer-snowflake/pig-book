import { combineReducers } from 'redux'

import { SessionStore, UserStatusStore, ProfileStore, NewCategoryStore, CategoriesStore, EditCategoryStore, BreakdownsStore, EditBreakdownStore, NewBreakdownStore, UsersStore, NewPlaceStore, PlacesStore, EditPlaceStore } from 'types/store'
import sessionReducer from 'reducers/sessionReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import newCategoryReducer from 'reducers/newCategoryReducer'
import editCategoryReducer from 'reducers/editCategoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import breakdownsReducer from 'reducers/breakdownsReducer'
import newBreakdownReducer from 'reducers/newBreakdownReducer'
import editBreakdownReducer from 'reducers/editBreakdownReducer'
import newPlaceReducer from 'reducers/newPlaceReducer'
import editPlaceReducer from 'reducers/editPlaceReducer'
import placesReducer from 'reducers/placesReducer'
import usersReducer from './usersReducer'

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
  newPlace: NewPlaceStore;
  editPlace: EditPlaceStore;
  places: PlacesStore;
  users: UsersStore;
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
  editBreakdown: editBreakdownReducer,
  newPlace: newPlaceReducer,
  editPlace: editPlaceReducer,
  places: placesReducer,
  users: usersReducer
})

export default rootReducer
