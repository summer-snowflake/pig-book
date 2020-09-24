import { combineReducers } from 'redux'

import {
  SessionStore, UserStore, ProfileStore, NewCategoryStore, CategoriesStore, EditCategoryStore, BreakdownsStore, EditBreakdownStore, NewBreakdownStore, UsersStore, NewPlaceStore, PlacesStore, EditPlaceStore, PlaceCategoriesStore, NewRecordStore, RecordsStore, EditRecordStore, RecordSearchStore, DashboardStore, DashboardsStore, RegistrationStore, ResponseErrorsStore, TutorialStore, TagsStore, EditTagStore, NewTagStore, DashboardCategoryStore, AssetsAccountsStore, NewAssetsAccountStore
} from 'types/store'
import sessionReducer from 'reducers/sessionReducer'
import registrationReducer from 'reducers/registrationReducer'
import userReducer from 'reducers/userReducer'
import profileReducer from 'reducers/profileReducer'
import newCategoryReducer from 'reducers/newCategoryReducer'
import editCategoryReducer from 'reducers/editCategoryReducer'
import categoriesReducer from 'reducers/categoriesReducer'
import placeCategoriesReducer from 'reducers/placeCategoriesReducer'
import breakdownsReducer from 'reducers/breakdownsReducer'
import newBreakdownReducer from 'reducers/newBreakdownReducer'
import newTagReducer from 'reducers/newTagReducer'
import editBreakdownReducer from 'reducers/editBreakdownReducer'
import newPlaceReducer from 'reducers/newPlaceReducer'
import editPlaceReducer from 'reducers/editPlaceReducer'
import editTagReducer from 'reducers/editTagReducer'
import placesReducer from 'reducers/placesReducer'
import tagsReducer from 'reducers/tagsReducer'
import usersReducer from 'reducers/usersReducer'
import newRecordReducer from 'reducers/newRecordReducer'
import recordsReducer from 'reducers/recordsReducer'
import editRecordReducer from 'reducers/editRecordReducer'
import recordSearchReducer from 'reducers/recordSearchReducer'
import dashboardReducer from 'reducers/dashboardReducer'
import dashboardCategoryReducer from 'reducers/dashboardCategoryReducer'
import dashboardsReducer from 'reducers/dashboardsReducer'
import errorsReducer from 'reducers/errorsReducer'
import tutorialReducer from 'reducers/tutorialReducer'
import assetsAccountsReducer from 'reducers/assetsAccountsReducer'
import newAssetsAccountReducer from 'reducers/newAssetsAccountReducer'

export type RootState = {
  session: SessionStore;
  registration: RegistrationStore;
  user: UserStore;
  profile: ProfileStore;
  newCategory: NewCategoryStore;
  editCategory: EditCategoryStore;
  categories: CategoriesStore;
  breakdowns: BreakdownsStore;
  newBreakdown: NewBreakdownStore;
  editBreakdown: EditBreakdownStore;
  newPlace: NewPlaceStore;
  editPlace: EditPlaceStore;
  newTag: NewTagStore;
  editTag: EditTagStore;
  places: PlacesStore;
  tags: TagsStore;
  placeCategories: PlaceCategoriesStore;
  users: UsersStore;
  newRecord: NewRecordStore;
  editRecord: EditRecordStore;
  records: RecordsStore;
  recordSearch: RecordSearchStore;
  dashboard: DashboardStore;
  dashboardCategory: DashboardCategoryStore;
  dashboards: DashboardsStore;
  responseErrors: ResponseErrorsStore;
  tutorial: TutorialStore;
  assetsAccounts: AssetsAccountsStore;
  newAssetsAccount: NewAssetsAccountStore;
}

const rootReducer = combineReducers({
  session: sessionReducer,
  registration: registrationReducer,
  user: userReducer,
  profile: profileReducer,
  newCategory: newCategoryReducer,
  editCategory: editCategoryReducer,
  categories: categoriesReducer,
  breakdowns: breakdownsReducer,
  newBreakdown: newBreakdownReducer,
  editBreakdown: editBreakdownReducer,
  newPlace: newPlaceReducer,
  editPlace: editPlaceReducer,
  newTag: newTagReducer,
  editTag: editTagReducer,
  places: placesReducer,
  tags: tagsReducer,
  placeCategories: placeCategoriesReducer,
  users: usersReducer,
  newRecord: newRecordReducer,
  editRecord: editRecordReducer,
  records: recordsReducer,
  recordSearch: recordSearchReducer,
  dashboard: dashboardReducer,
  dashboardCategory: dashboardCategoryReducer,
  dashboards: dashboardsReducer,
  responseErrors: errorsReducer,
  tutorial: tutorialReducer,
  assetsAccounts: assetsAccountsReducer,
  newAssetsAccount: newAssetsAccountReducer
})

export default rootReducer
