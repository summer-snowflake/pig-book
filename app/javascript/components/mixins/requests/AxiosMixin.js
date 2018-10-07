import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const axiosMixin = {
  request : (method, callback, errorCallback, url, params={}) => {
    let options = {
      method: method,
      url: origin + url,
      params: Object.assign(params, { last_request_at: LocalStorageMixin.getLastRequestAt() }),
      headers: { 'Authorization': 'Token token=' + LocalStorageMixin.getUserToken() },
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
