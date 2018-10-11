import { axiosMixin } from './AxiosMixin'

export const categoriesAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/categories'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const categoryAxios = {
  post : (params, callback, errorCallback) => {
    let url = '/api/categories'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (categoryId, params, callback, errorCallback) => {
    let url = '/api/categories/' + categoryId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (categoryId, callback, errorCallback) => {
    let url = '/api/categories/' + categoryId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  }
}
