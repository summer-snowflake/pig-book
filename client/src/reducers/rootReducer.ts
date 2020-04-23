import { combineReducers } from 'redux'

import { SessionStore, UserStatusStore, ProfileStore, NewCategoryStore, CategoriesStore, EditCategoryStore, BreakdownsStore, EditBreakdownStore, NewBreakdownStore, UsersStore, NewPlaceStore, PlacesStore, EditPlaceStore, PlaceCategoriesStore, NewRecordStore, RecordsStore, EditRecordStore, RecordSearchStore, DashboardStore, DashboardsStore, RegistrationStore, ResponseErrorsStore } from 'types/store'
import sessionReducer from 'reducers/sessionReducer'
import registrationReducer from 'reducers/registrationReducer'
import userStatusReducer from 'reducers/userStatusReducer'
import profileReducer from 'reducers/profileReducer'
import newCategoryReducer from 'reducers/newCategoryReducer'
import editCategoryReducer from 'reducers/editCategoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import placeCategoriesReducer from 'reducers/placeCategoriesReducer'
import breakdownsReducer from 'reducers/breakdownsReducer'
import newBreakdownReducer from 'reducers/newBreakdownReducer'
import editBreakdownReducer from 'reducers/editBreakdownReducer'
import newPlaceReducer from 'reducers/newPlaceReducer'
import editPlaceReducer from 'reducers/editPlaceReducer'
import placesReducer from 'reducers/placesReducer'
import usersReducer from 'reducers/usersReducer'
import newRecordReducer from 'reducers/newRecordReducer'
import recordsReducer from 'reducers/recordsReducer'
import editRecordReducer from 'reducers/editRecordReducer'
import recordSearchReducer from 'reducers/recordSearchReducer'
import dashboardReducer from 'reducers/dashboardReducer'
import dashboardsReducer from 'reducers/dashboardsReducer'
import errorsReducer from 'reducers/errorsReducer'

export type RootState = {
  session: SessionStore;
  registration: RegistrationStore;
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
  placeCategories: PlaceCategoriesStore;
  users: UsersStore;
  newRecord: NewRecordStore;
  editRecord: EditRecordStore;
  records: RecordsStore;
  recordSearch: RecordSearchStore;
  dashboard: DashboardStore;
  dashboards: DashboardsStore;
  responseErrors: ResponseErrorsStore;
}

const rootReducer = combineReducers({
  session: sessionReducer,
  registration: registrationReducer,
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
  placeCategories: placeCategoriesReducer,
  users: usersReducer,
  newRecord: newRecordReducer,
  editRecord: editRecordReducer,
  records: recordsReducer,
  recordSearch: recordSearchReducer,
  dashboard: dashboardReducer,
  dashboards: dashboardsReducer,
  responseErrors: errorsReducer
})

export default rootReducer
