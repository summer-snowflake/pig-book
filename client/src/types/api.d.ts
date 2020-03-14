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
  date: string;
  category_id: number;
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
  };
}

export interface User {
  id: number;
  email: string;
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

export interface Record {
  id: number;
  category_id: number;
  breakdown_id: number;
  place_id: number;
  published_on: Date;
  charge: string;
  point: number;
  cashless_charge: number;
  memo: string;
  category: Category;
  breakdown: Breakdown;
  place: Place;
}
