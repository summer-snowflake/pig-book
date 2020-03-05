import { Errors } from 'types/api'

export interface CookiesHeader {
  uid: string;
  client: string;
  'access-token': string;
}

export interface SessionStore {
  isLoading: boolean;
}

export interface UserStatusStore {
  isLoading: boolean;
  isLogged: boolean;
}

export interface ProfileStore {
  isLoading: boolean;
  editing: boolean;
  editingMemo: boolean;
  locale: string;
  currency: string;
  memo: string;
}

export interface NewCategoryStore extends Errors {
  isLoading: boolean;
  balance_of_payments: boolean;
  name: string;
}

export interface NewBreakdownStore extends Errors {
  isLoading: boolean;
  category_id: number;
  name: string;
}

export interface EditCategoryStore extends Errors {
  isLoading: boolean;
  editingId: number;
}

export interface EditBreakdownStore extends Errors {
  isLoading: boolean;
  editingId: number;
}

export interface CategoriesStore {
  isLoading: boolean;
  categories: Category[];
}

export interface BreakdownsStore {
  isLoading: boolean;
  breakdowns: Breakdown[];
}
