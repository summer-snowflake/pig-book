import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'
import { axiosMixin } from './AxiosMixin'

export const recordsAxios = {
  get : (params={}, callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/records',
      params: Object.assign(params, { last_request_at: LocalStorageMixin.getLastRequestAt() }),
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then((res) => {
        callback(res, params)
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}

export const recordAxios = {
  get : (recordId, callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/records/' + recordId,
      params: {
        last_request_at: LocalStorageMixin.getLastRequestAt()
      },
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then((res) => {
        callback(res)
      })
      .catch((error) => {
        errorCallback(error)
      })
  },
  post : (params, callback, errorCallback) => {
    let options = {
      method: 'POST',
      url: origin + '/api/records',
      params: Object.assign(params, {last_request_at: LocalStorageMixin.getLastRequestAt()}),
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then((res) => {
        callback(res)
      })
      .catch((error) => {
        errorCallback(error)
      })
  },
  patch: (recordId, params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/records/' + recordId,
      params: Object.assign(params, {last_request_at: LocalStorageMixin.getLastRequestAt()}),
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then(() => {
        callback(params)
      })
      .catch((error) => {
        errorCallback(error)
      })
  },
  delete : (recordId, callback, errorCallback) => {
    let options = {
      method: 'DELETE',
      url: origin + '/api/records/' + recordId,
      params: {
        last_request_at: LocalStorageMixin.getLastRequestAt()
      },
      headers: {
        'Authorization': 'Token token=' + LocalStorageMixin.getUserToken()
      },
      json: true
    }
    axios(options)
      .then(() => {
        callback()
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}
