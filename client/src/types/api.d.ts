export interface Errors {
  errors: string[];
}

export interface LoginParams {
  email: string;
  password: string;
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
  date?: Date | null;
  month?: number | null;
  year?: number | null;
  order?: string | null;
}

export interface Admin {
  id: number;
  user_id: number;
}

export interface AdminUser extends User {
  total: {
    category: number;
    breakdown: number;
    place: number;
    record: number;
  };
}

export interface User {
  id: number;
  email: string;
  current_sign_in_at: string;
  uid: string;
  admin: Admin;
}

export interface Profile {
  id: number;
  locale: string;
  currency: string;
  memo: string;
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

export interface WithRelationsCategory extends Category {
  breakdowns: Breakdown[];
  places: Place[];
}
