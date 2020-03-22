import { Category, Breakdown, User, Place } from './api'
import { Action } from 'redux'

export interface ErrorsAction extends Action {
  errors: Errors;
}

export interface UserAction extends Action {
  user: User;
}

export interface ProfileAction extends Action {
  profile: Profile;
}

export interface CategoryAction extends Action {
  category: Category;
}

export interface BreakdownAction extends Action {
  breakdown: Breakdown;
}

export interface PlaceAction extends Action {
  place: Place;
}

export interface CategoriesAction extends Action {
  categories: Category[];
}

export interface BreakdownsAction extends Action {
  breakdowns: Breakdown[];
}

export interface PlacesAction extends Action {
  places: Place[];
}

export interface UsersAction extends Action {
  users: User[];
}

export interface RecordAction extends Action {
  record: Record;
}

export interface RecordsAction extends Action {
  records: Record[];
  max_page: number;
}
