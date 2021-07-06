import { combineReducers } from 'redux'

import {
  SessionStore,
  RegistrationStore,
  ConfirmationStore,
  UserStore,
  ProfileStore,
  NewCategoryStore,
  CategoriesStore,
  EditCategoryStore,
  BreakdownsStore,
  EditBreakdownStore,
  NewBreakdownStore,
  UsersStore,
  NewPlaceStore,
  PlacesStore,
  EditPlaceStore,
  PlaceCategoriesStore,
  NewRecordStore,
  RecordsStore,
  EditRecordStore,
  RecordSearchStore,
  DashboardStore,
  DashboardsStore,
  ResponseErrorsStore,
  TutorialStore,
  TagsStore,
  EditTagStore,
  NewTagStore,
  DashboardCategoryStore,
  AssetsAccountsStore,
  NewAssetsAccountStore,
  EditAssetsAccountStore,
  PiggyBanksStore,
  NewPiggyBankStore,
  PiggyBankStore,
  EditPiggyBankStore,
  PiggyItemsStore,
  NewPiggyItemStore,
  EditPiggyItemStore
} from 'types/store'
import sessionReducer from 'reducers/sessionReducer'
import registrationReducer from 'reducers/registrationReducer'
import confirmationReducer from 'reducers/confirmationReducer'
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
import editAssetsAccountReducer from 'reducers/editAssetsAccountReducer'
import piggyBankReducer from 'reducers/piggyBankReducer'
import piggyBanksReducer from 'reducers/piggyBanksReducer'
import newPiggyBankReducer from 'reducers/newPiggyBankReducer'
import editPiggyBankReducer from 'reducers/editPiggyBankReducer'
import piggyItemsReducer from 'reducers/piggyItemsReducer'
import newPiggyItemReducer from 'reducers/newPiggyItemReducer'
import editPiggyItemReducer from 'reducers/editPiggyItemReducer'

export type RootState = {
  session: SessionStore;
  registration: RegistrationStore;
  confirmation: ConfirmationStore;
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
  editAssetsAccount: EditAssetsAccountStore;
  piggyBank: PiggyBankStore;
  piggyBanks: PiggyBanksStore;
  newPiggyBank: NewPiggyBankStore;
  editPiggyBank: EditPiggyBankStore;
  piggyItems: PiggyItemsStore;
  newPiggyItem: NewPiggyItemStore;
  editPiggyItem: EditPiggyItemStore;
}

const rootReducer = combineReducers({
  session: sessionReducer,
  registration: registrationReducer,
  confirmation: confirmationReducer,
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
  newAssetsAccount: newAssetsAccountReducer,
  editAssetsAccount: editAssetsAccountReducer,
  piggyBank: piggyBankReducer,
  piggyBanks: piggyBanksReducer,
  newPiggyBank: newPiggyBankReducer,
  editPiggyBank: editPiggyBankReducer,
  piggyItems: piggyItemsReducer,
  newPiggyItem: newPiggyItemReducer,
  editPiggyItem: editPiggyItemReducer
})

export default rootReducer
