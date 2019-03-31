import { axiosMixin } from './AxiosMixin'

export const downloadFilesAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/download_files'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}
