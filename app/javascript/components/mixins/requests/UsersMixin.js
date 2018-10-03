import axios from 'axios'
import LocalStorageMixin from './../LocalStorageMixin'

export const userAxios = {
  patch: (userId, callback, errorCallback) => {
    let options = {
      method: 'PATCH',
      url: origin + '/api/admin/users/' + userId + '/tally',
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
