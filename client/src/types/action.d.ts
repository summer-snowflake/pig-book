import { Category, Breakdown } from './api'
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

export interface CategoriesAction extends Action {
  categories: Category[];
}

export interface BreakdownsAction extends Action {
  breakdowns: Breakdown[];
}
