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
  },
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
