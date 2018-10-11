import { axiosMixin } from './AxiosMixin'

export const templatesAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/templates'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}

export const templateAxios = {
  post : (params, callback, errorCallback) => {
    let url = '/api/templates'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  },
  patch: (templateId, params, callback, errorCallback) => {
    let url = '/api/templates/' + templateId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete : (templateId, callback, errorCallback) => {
    let url = '/api/templates/' + templateId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  }
}
