import { axiosMixin } from './AxiosMixin'

export const monthlyBalanceTablesAxios = {
  get : (year, callback, errorCallback) => {
    let url = '/api/monthly_balance_tables/' + year
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const yearlyBalanceTablesAxios = {
  get : (year, callback, errorCallback) => {
    let url = '/api/yearly_balance_tables/' + year
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const yearlyBalanceTablesCategoryAxios = {
  get : (year, callback, errorCallback) => {
    let url = '/api/yearly_balance_tables/' + year + '/category'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}
