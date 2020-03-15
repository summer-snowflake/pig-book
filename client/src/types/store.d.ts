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
  admin: Admin;
}

export interface ProfileStore {
  isLoading: boolean;
  isLoadingMemo: boolean;
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

export interface NewPlaceStore extends Errors {
  isLoading: boolean;
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

export interface EditPlaceStore extends Errors {
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

export interface PlacesStore {
  isLoading: boolean;
  places: Place[];
}

export interface PlaceCategoriesStore {
  isLoading: boolean;
  categories: Category[];
}

export interface UsersStore {
  isLoading: boolean;
  users: User[];
}

export interface NewRecordStore {
  isLoading: boolean;
  editing: boolean;
  record: Record;
  breakdowns: Breakdown[];
  places: Place[];
  errors: string[];
}

export interface RecordsStore {
  isLoading: boolean;
  records: Record[];
}
