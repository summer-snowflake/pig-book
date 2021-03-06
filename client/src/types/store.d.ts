import { Errors, Category, Breakdown, Place, Event, MonthlyBalanceTable, YearlyBalanceTable, PiggyBank } from 'types/api'

export interface CookiesHeader {
  uid: string;
  client: string;
  'access-token': string;
}

export interface SessionStore {
  isLoading: boolean;
}

export interface RegistrationStore extends Errors {
  isLoading: boolean;
  sendMail: boolean;
}

export interface UserStore extends Errors {
  isLoading: boolean;
  isLogged: boolean;
  admin: Admin;
  email: string;
  dailyOption: boolean;
  unlimitedOption: boolean;
  piggyBankOption: boolean;
  optionsList: string;
  options: UserOption[];
  recordsCount: number;
  dashboardYears: number[];
}

export interface UserOption {
  id: number;
  name: string;
  column: string;
  value: boolean;
  description: string;
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

export interface TutorialStore {
  isLoading: boolean;
  categoryExists: boolean;
  breakdownExists: boolean;
  placeExists: boolean;
  recordExists: boolean;
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
  balance_of_payments: boolean;
}

export interface NewPlaceStore extends Errors {
  isLoading: boolean;
  name: string;
}

export interface NewTagStore extends Errors {
  isLoading: boolean;
  name: string;
  color_code: string;
}

export interface EditCategoryStore extends Errors {
  isLoading: boolean;
  editedCategoryId: number;
  category: Category;
}

export interface EditBreakdownStore extends Errors {
  isLoading: boolean;
  editedBreakdownId: number;
  breakdown: Breakdown;
}

export interface EditPlaceStore extends Errors {
  isLoading: boolean;
  editedPlaceId: number;
  place: WithCategoriesPlace;
}

export interface EditTagStore extends Errors {
  isLoading: boolean;
  editedTagId: number;
  tag: Tag;
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
  places: WithCategoriesPlace[];
}

export interface PlaceCategoriesStore {
  isLoading: boolean;
  categories: Category[];
}

export interface TagsStore {
  isLoading: boolean;
  tags: Tag[];
}

export interface UsersStore {
  isLoading: boolean;
  users: AdminUser[];
  maxPage: number;
  page: number;
}

export interface NewRecordStore {
  isLoading: boolean;
  isOpenNewRecordModal: boolean;
  editing: boolean;
  record: FrontRecord;
  breakdowns: Breakdown[];
  places: Place[];
  errors: string[];
}

export interface EditRecordStore {
  isLoading: boolean;
  isOpenEditRecordModal: boolean;
  editedRecordId: number | undefined;
  record: FrontEditRecord;
  breakdowns: Breakdown[];
  places: Place[];
  errors: string[];
}

interface FrontEditRecord extends FrontRecord {
  id: number;
}

interface FrontRecord {
  id?: number;
  published_on: Date;
  charge: number | string;
  cashless_charge: number | string;
  point: number | string;
  memo: string;
  category: Category | { id: undefined, balance_of_payments: boolean };
  category_id: number | undefined;
  breakdown_id: number | undefined;
  place_id: number | undefined;
  tags: Tag[];
}

export interface RecordsStore {
  isLoading: boolean;
  records: Record[];
  maxPage: number;
  totals: RecordTotals;
  totalCount: number;
}

export interface RecordSearchStore {
  page: number;
  date: Date | null;
  year: number | null;
  month: number | null;
  order: string | null;
  category_id: number | null;
  category_name: string | null;
  breakdown_id: number | null;
  breakdown_name: string | null;
  place_id: number | null;
  place_name: string | null;
  tag_ids: string;
  tags: Tag[];
}

interface DashboardStore {
  isLoading: boolean;
  year: number;
  event: Event | null;
  monthly_total: MonthlyBalanceTable[];
  yearly_category_income: YearlyBalanceTable[];
  yearly_category_expenditure: YearlyBalanceTable[];
  yearly_breakdown_income: YearlyBalanceTable[];
  yearly_breakdown_expenditure: YearlyBalanceTable[];
  yearly_total?: YearlyBalanceTable;
  categories?: Category[];
}

export interface DashboardCategoryStore {
  isLoading: boolean;
  monthlyBreakdowns: MonthlyCategoryBalanceTable[];
  breakdowns: Breakdown[];
}

export interface DashboardsStore {
  isLoading: boolean;
  dashboards: DashboardStore[];
}

export interface ResponseErrorsStore {
  status: number;
}

export interface NewAssetsAccountStore extends Errors {
  isLoading: boolean;
  isOpen: boolean;
  balance_of_payments: boolean;
  name: string;
  currency: string;
  money: string;
  position: number | null;
  checked: boolean;
}

export interface EditAssetsAccountStore extends Errors {
  editedAssetsAccountId: number;
  isLoading: boolean;
  isOpen: boolean;
  id: number;
  balance_of_payments: boolean;
  name: string;
  currency: string;
  money: string;
  position: number | null;
  checked: boolean;
}

export interface AssetsAccountsStore {
  isLoading: boolean;
  assetsAccounts: AssetsAccount[];
}

export interface PiggyBanksStore {
  isLoading: boolean;
  piggyBanks: PiggyBank[];
}

export interface PiggyBankStore {
  isLoading: boolean;
  editing: boolean;
  piggyBank: null | PiggyBank;
}

export interface NewPiggyBankStore extends Errors {
  isLoading: boolean;
  isOpen: boolean;
  id?: number;
  currency: string;
  title: string;
  description: string;
}

export interface EditPiggyBankStore extends Errors {
  isLoading: boolean;
  id: number;
  currency: string;
  title: string;
  description: string;
}

export interface PiggyItemsStore {
  isLoading: boolean;
  piggyItems: PiggyItem[];
}

export interface NewPiggyItemStore extends Errors {
  isLoading: boolean;
  isOpen: boolean;
  id?: number;
  publishedOn: Date;
  name: string;
  balance_of_payments: boolean;
  charge: string;
}

export interface EditPiggyItemStore extends Errors {
  isLoading: boolean;
  isOpen: boolean;
  id: number;
  publishedOn: Date;
  name: string;
  balance_of_payments: boolean;
  charge: string;
}
