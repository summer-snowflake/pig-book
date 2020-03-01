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

export interface ProfileParams {
  locale: string;
  currency: string;
  memo: string;
}

export interface User {
  id: number;
  email: string;
  uid: string;
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
