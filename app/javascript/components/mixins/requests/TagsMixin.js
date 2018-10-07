import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const tagsAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/tags',
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

export const tagAxios = {
  post : (params, callback, errorCallback) => {
    let options = {
      method: 'POST',
      url: origin + '/api/tags',
      params: Object.assign(params, {last_request_at: LocalStorageMixin.getLastRequestAt()}),
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
  },
  patch: (tagId, params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/tags/' + tagId,
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
  delete : (tagId, callback, errorCallback) => {
    let options = {
      method: 'DELETE',
      url: origin + '/api/tags/' + tagId,
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
