import { axiosMixin } from './AxiosMixin'

export const recordsAxios = {
  get : (params={}, callback, errorCallback) => {
    let url = '/api/records'
    axiosMixin.request('GET', callback, errorCallback, url, params)
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
