import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const profileAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/base_setting',
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
  patch: (params, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/base_setting',
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
  }
}
