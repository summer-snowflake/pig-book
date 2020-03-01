import { Category } from './api'
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

export interface CategoriesAction extends Action {
  categories: Category[];
}
