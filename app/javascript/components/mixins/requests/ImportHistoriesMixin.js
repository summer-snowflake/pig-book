import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const fileAxios = {
  post : (fileParams, callback, errorCallback) => {
    let url = origin + '/api/import_histories'
    let headers = { 'Authorization': 'Token token=' + LocalStorageMixin.getUserToken() }
    axios.post(url, fileParams, { headers: headers })
      .then(() => {
        callback()
      })
      .catch((error) => {
        errorCallback(error)
      })
  }
}

export const importHistoriesAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/import_histories',
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
  getWithStatus : (statusName, callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/import_histories' + statusName,
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
  }
}

export const importHistoriesCountAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/import_histories/unregistered_count',
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
  }
}
