import { axiosMixin } from './AxiosMixin'

export const recentlyUsedAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/recently_used'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}
