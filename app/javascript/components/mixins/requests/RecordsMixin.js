import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'
import { axiosMixin } from './AxiosMixin'

export const recordsAxios = {
  get : (params={}, callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/records',
      params: Object.assign(params, { last_request_at: LocalStorageMixin.getLastRequestAt() }),
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then((res) => {
        callback(res, params)
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}

export const recordAxios = {
  get : (recordId, callback, errorCallback) => {
    let url = '/api/records/' + recordId
    axiosMixin.request('GET', callback, errorCallback, url)
  },
  post : (params, callback, errorCallback) => {
    let url = '/api/records'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (recordId, params, callback, errorCallback) => {
    let url = '/api/records/' + recordId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (recordId, callback, errorCallback) => {
    let url = '/api/records/' + recordId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  }
}
