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

export const importHistoryAxios = {
  patch: (importHistoryId, params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/import_histories/' + importHistoryId,
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
  postCategory : (importHistoryId, callback, errorCallback) => {
    let options = {
      method: 'POST',
      url: origin + '/api/import_histories' + importHistoriesId + '/create_category',
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
      url: origin + '/api/import_histories/' + statusName,
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
