export interface Errors {
  errors: string[];
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface CategoryParams {
  name: string;
  balance_of_payments: boolean;
}

export interface BreakdownParams {
  category_id: number;
  name: string;
}

export interface PlaceParams {
  name: string;
}

export interface ProfileParams {
  locale: string;
  currency: string;
  memo: string;
}

export interface RecordParams {
  published_at: string;
  category_id: number;
  breakdown_id: number;
  place_id: number;
  charge: number;
  memo: string;
}

export interface RecordSearchParams {
  page?: number;
  date?: Date | null;
  month?: number | null;
  year?: number | null;
  order?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  breakdown_id?: number | null;
  breakdown_name?: string | null;
  place_id?: number | null;
  place_name?: string | null;
}

export interface RecordSearchResponseParams {
  page: number;
  date: Date | null;
  month: number | null;
  year: number | null;
  order: string | null;
  category_id: number | null;
  category_name: string | null;
  breakdown_id: number | null;
  breakdown_name: string | null;
  place_id: number | null;
  place_name: string | null;
}

export interface QueryParams {
  page: string;
  published_at: string;
  order: string;
  month: string;
  year: string;
  category_id: string;
  breakdown_id: string;
  place_id: string;
}

export interface Admin {
  id: number;
  user_id: number;
}

export interface AdminUser extends User {
  categories_count: number;
  breakdowns_count: number;
  places_count: number;
  records_count: number;
}

export interface User {
  id: number;
  email: string;
  current_sign_in_at: string;
  uid: string;
  active: boolean;
  admin: Admin;
  daily_option: boolean;
}

export interface Profile {
  id: number;
  locale: string;
  currency: string;
  memo: string;
}

export interface Tutorial {
  id: number;
  user: AdminUser;
}

export interface Category {
  id: number;
  name: string;
  balance_of_payments: boolean;
}

export interface Breakdown {
  id: number;
  name: string;
  category_id: number;
  category: Category;
}

export interface Place {
  id: number;
  name: string;
}

export interface WithCategoriesPlace extends Place {
  categories: Category[];
}

export interface ReadRecord {
  id: number;
  category_id: number;
  breakdown_id: number;
  place_id: number;
  published_at: Date;
  charge: string;
  human_charge: string;
  point: number;
  cashless_charge: number;
  memo: string;
  category: Category;
  breakdown: Breakdown;
  place: Place;
}

export interface Record {
  id: number;
  published_at: Date;
  category_id: number;
  breakdown_id: number;
  place_id: number;
  charge: string;
  point: number;
  cashless_charge: number;
  memo: string;
  category: Category;
  breakdown: Breakdown;
  place: Place;
}

export interface RecordTotals {
  human_income_charge: string;
  human_expenditure_charge: string;
  human_all_charge: string;
  use_cashless_charge: number;
  use_point: number;
}

export interface WithRelationsCategory extends Category {
  breakdowns: Breakdown[];
  places: Place[];
}

export interface Event {
  user_id: number;
  year: number;
  created_at: string;
}

interface MonthlyBalanceTable {
  month: number;
  income: number;
  expenditure: number;
  cashless_charge: number;
  point: number;
  currency: string;
}

interface YearlyBalanceTable {
  year: number;
  income: number;
  expenditure: number;
  cashless_charge: number;
  point: number;
  currency: string;
  category_id: number | null;
  label: string;
}

export interface Dashboard {
  event: Event;
  monthly: MonthlyBalanceTable[];
  yearly: YearlyBalanceTable;
}
