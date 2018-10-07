import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const recentlyUsedAxios = {
  get : (callback, errorCallback) => {
    let options = {
      method: 'GET',
      url: origin + '/api/recently_used',
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
