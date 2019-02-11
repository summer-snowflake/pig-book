import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'
import { axiosMixin } from './AxiosMixin'

export const fileAxios = {
  post : (fileParams, callback, errorCallback) => {
    let url = origin + '/api/import_histories'
    let headers = { 'Authorization': 'Token token=' + LocalStorageMixin.getUserToken() }
    fileParams.append('last_request_at', LocalStorageMixin.getLastRequestAt())
    axios.post(url, fileParams, { headers: headers })
      .then(() => {
        callback()
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}

export const importHistoryAxios = {
  patch: (importHistoryId, params, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId
    axiosMixin.request('PATCH', callback, errorCallback, url, params)
  },
  delete: (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId
    axiosMixin.request('DELETE', callback, errorCallback, url)
  },
  postCategory : (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId + '/create_category'
    axiosMixin.request('POST', callback, errorCallback, url)
  },
  postBreakdown : (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId + '/create_breakdown'
    axiosMixin.request('POST', callback, errorCallback, url)
  },
  postPlace : (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId + '/create_place'
    axiosMixin.request('POST', callback, errorCallback, url)
  },
  postTags : (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId + '/create_tags'
    axiosMixin.request('POST', callback, errorCallback, url)
  },
  postRecord : (importHistoryId, callback, errorCallback) => {
    let url = '/api/import_histories/' + importHistoryId + '/create_record'
    axiosMixin.request('POST', callback, errorCallback, url)
  }
}

export const importHistoriesAxios = {
  getWithStatus : (statusName, callback, errorCallback) => {
    let url = '/api/import_histories/' + statusName
    axiosMixin.request('GET', callback, errorCallback, url)
  },
  post : (params, callback, errorCallback) => {
    let url = '/api/import_histories/rename_rows'
    axiosMixin.request('POST', callback, errorCallback, url, params)
  }
}

export const importHistoriesCountAxios = {
  get : (callback, errorCallback) => {
    let url = '/api/import_histories/unregistered_count'
    axiosMixin.request('GET', callback, errorCallback, url)
  }
}
