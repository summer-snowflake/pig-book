import { Category, Breakdown, User, Place, RecordTotals, Event, Tutorial } from './api'
import { Action } from 'redux'

export interface ErrorsAction extends Action {
  errors: Errors;
}

export interface ResponseErrorsAction extends Action {
  errorResponse: HttpErrorResponse;
}

export interface UserAction extends Action {
  user: User;
}

export interface ProfileAction extends Action {
  profile: Profile;
}

export interface TutorialAction extends Action {
  tutorial: Tutorial;
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

export interface TagsAction extends Action {
  tags: Tag[];
}

export interface UsersAction extends Action {
  users: User[];
  page: number;
  max_page: number;
}

export interface RecordAction extends Action {
  record: Record;
}

export interface EventAction extends Action {
  event: Event | null;
}

export interface RecordsAction extends Action {
  records: Record[];
  max_page: number;
  totals: RecordTotals;
  total_count: number;
}

export interface DashboardAction extends Action {
  dashboard: Dashboard;
}

export interface DashboardsAction extends Action {
  dashboards: Dashboard[];
}
