import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const breakdownsAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/breakdowns',
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

export const breakdownAxios = {
  post : (params, callback, errorCallback) => {
    let options = {
      method: 'POST',
      url: origin + '/api/breakdowns',
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
  patch: (breakdownId, params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/breakdowns/' + breakdownId,
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
  delete : (breakdownId, callback, errorCallback) => {
    let options = {
      method: 'delete',
      url: origin + '/api/breakdowns/' + breakdownId,
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
