import { axiosMixin } from './AxiosMixin'

export const monthlyBalanceTablesAxios = {
  get : (year, callback, errorCallback) => {
    let url = '/api/monthly_balance_tables/' + year
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}
