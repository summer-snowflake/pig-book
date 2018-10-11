import { axiosMixin } from './AxiosMixin'

export const placesAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/places'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const placeAxios = {
  post : (params, callback, errorCallback) => {
    let url = '/api/places'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (placeId, params, callback, errorCallback) => {
    let url = '/api/places/' + placeId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (placeId, callback, errorCallback) => {
    let url = '/api/places/' + placeId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  },
  getCategories : (placeId, callback, errorCallback) => {
    let url = '/api/places/' + placeId + '/categories'
    axiosMixin.request('GET', callback, errorCallback, url)
  },
  postCategorized : (params, callback, errorCallback) => {
    let url = '/api/categorized_places'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  }
}
