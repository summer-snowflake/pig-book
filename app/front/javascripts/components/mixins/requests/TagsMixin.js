import { axiosMixin } from './AxiosMixin'

export const tagsAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/tags'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const tagAxios = {
  post : (params, callback, errorCallback) => {
    let url = '/api/tags'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (tagId, params, callback, errorCallback) => {
    let url = '/api/tags/' + tagId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (tagId, callback, errorCallback) => {
    let url = '/api/tags/' + tagId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  }
}
