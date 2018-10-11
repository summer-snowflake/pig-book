import { axiosMixin } from './AxiosMixin'

export const breakdownsAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/breakdowns'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const breakdownAxios = {
  post : (params, callback, errorCallback) => {
    let url = '/api/breakdowns'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (breakdownId, params, callback, errorCallback) => {
    let url = '/api/breakdowns/' + breakdownId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (breakdownId, callback, errorCallback) => {
    let url = '/api/breakdowns/' + breakdownId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  }
}
