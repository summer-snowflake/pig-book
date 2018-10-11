import { axiosMixin } from './AxiosMixin'

export const profileAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/base_setting'
    axiosMixin.request('GET', callback, errorCallback, url)
  },
  patch: (params, callback, errorCallback) => {
    let url = '/api/base_setting'
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  }
}
