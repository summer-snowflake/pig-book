import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const templatesAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/templates',
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

export const templateAxios = {
  post : (params, callback, errorCallback) => {
    let options = {
      method: 'POST',
      url: origin + '/api/templates',
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
  patch: (templatesId, params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/templates/' + templatesId,
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
  delete : (templateId, callback, errorCallback) => {
    let options = {
      method: 'DELETE',
      url: origin + '/api/templates/' + templateId,
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
