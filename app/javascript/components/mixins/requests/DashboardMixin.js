import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const monthlyBalanceTablesAxios = {
  get : (year, callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/monthly_balance_tables/' + year,
      params: {
        last_request_at: LocalStorageMixin.getLastRequestAt()
      },
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then((res) => {
        callback(res)
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}
